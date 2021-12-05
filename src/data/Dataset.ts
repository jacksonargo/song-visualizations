import * as d3 from "d3";
import { intersection, isEmpty, uniq } from "lodash/fp";
import { useState } from "react";
import { CsvRow, useCsvData } from "./CsvRow";
import { Filter } from "./Filter";

export const AudioFeatures: AudioFeature[] = [
  "danceability",
  "energy",
  "speechiness",
  "acousticness",
  "instrumentalness",
  "liveness",
  "valence",
];

export type AudioFeature =
  | "danceability"
  | "energy"
  | "speechiness"
  | "acousticness"
  | "instrumentalness"
  | "liveness"
  | "valence";

export const AudioFeatureDefinitions = Object.freeze({
  danceability:
    "Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.",
  energy:
    "Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.",
  speechiness:
    "Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value. Values above 0.66 describe tracks that are probably made entirely of spoken words. Values between 0.33 and 0.66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 0.33 most likely represent music and other non-speech-like tracks.",
  acousticness:
    "A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic.",
  instrumentalness:
    'Predicts whether a track contains no vocals. "Ooh" and "aah" sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly "vocal". The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content. Values above 0.5 are intended to represent instrumental tracks, but confidence is higher as the value approaches 1.0.',
  liveness:
    "Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 0.8 provides strong likelihood that the track is live.",
  valence:
    "A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).",
});

export interface ArtistsVisRow {
  decade: number;
  artist: string;
  count: number;
  distinctArtists: number;
  genres: string[];
}

export interface FeaturesRow {
  year: number;
  decade: number;
  feature_name: string;
  value: number;
  genres: string[];
}

export function useData(): Dataset | undefined {
  const dataBytes = useCsvData();
  const [dataset, setDataset] = useState<Dataset | undefined>(undefined);
  if (dataBytes && dataset?.dataBlob !== dataBytes)
    setDataset(new Dataset(dataBytes));
  return dataset;
}

export class Dataset {
  readonly dataBlob: string;
  readonly rows: CsvRow[];
  readonly genres: string[];
  readonly genreCounts: Map<string, number>;

  constructor(dataBlob: string) {
    const rows = d3.csvParse(dataBlob).map((rawRow) => new CsvRow(rawRow));
    const genres = rows.flatMap((r) => r.genres());

    this.dataBlob = dataBlob;
    this.rows = rows;

    this.genreCounts = genres.reduce(
      (counter, genre) => counter.set(genre, 1 + (counter.get(genre) ?? 0)),
      new Map<string, number>()
    );

    this.genres = uniq(genres).sort((aName, bName) => {
      const aCount = this.genreCounts.get(aName) ?? 0;
      const bCount = this.genreCounts.get(bName) ?? 0;
      if (aCount === bCount) return aName.localeCompare(bName);
      return aCount - bCount;
    });
  }

  selectCSVRows(filter: Filter): CsvRow[] {
    const selectedGenres = filter.genreToggles.selection();
    return this.rows
      .filter((r) => r.year() >= filter.yearStart)
      .filter((r) => r.year() < filter.yearEnd)
      .filter(
        (row) =>
          isEmpty(selectedGenres) ||
          intersection(selectedGenres, row.genres()).length > 0
      );
  }

  unpivotFeatures(filter: Filter): FeaturesRow[] {
    const selectedFeatures = filter.featureToggles.selection();
    if (isEmpty(selectedFeatures)) selectedFeatures.push(...AudioFeatures);
    return this.selectCSVRows(filter).flatMap((r) => {
      return selectedFeatures.map<FeaturesRow>((feature_name) => ({
        year: r.year(),
        decade: r.decade(),
        feature_name: feature_name,
        value: r[feature_name] ? Number(r[feature_name]) : 0,
        genres: r.genres(),
      }));
    });
  }

  toArtistsVisRow(filter: Filter): ArtistsVisRow[] {
    const data = this.selectCSVRows(filter).map((r) => ({
      artist: r.artist,
      year: r.year(),
      decade: r.decade(),
      genres: r.genres(),
    }));

    const grouping = d3.group(
      data,
      (r) => r.decade,
      (r) => r.artist
    );

    return Array.from(grouping).flatMap(([decade, decadeGrouping]) => {
      const rollup = Array.from(decadeGrouping).map(
        ([artist, artistGrouping]) => ({
          decade: decade,
          artist: artist,
          count: artistGrouping.length,
          distinctArtists: 1,
          genres: artistGrouping.flatMap((r) => r.genres),
        })
      );

      rollup.push({
        decade: decade,
        artist: "",
        count: rollup.reduce((sum, g) => sum + g.count, 0),
        distinctArtists: rollup.length,
        genres: rollup.flatMap((r) => r.genres),
      });
      return rollup;
    });
  }
}
