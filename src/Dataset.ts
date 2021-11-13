import * as d3 from "d3";
import { intersection, isEmpty, uniq } from "lodash/fp";
import { CsvRow } from "./CsvRow";
import { GenreToggleMap } from "./GenreToggles";

const audioFeatures = [
  "danceability",
  "energy",
  "speechiness",
  "acousticness",
  "instrumentalness",
  "liveness",
  "valence",
];

export interface UniqueArtistsRollup {
  decade: number;
  artist: string;
  count: number;
  distinctArtists: number;
  genres: string[];
}

export interface GenreVisRow {
  year: number;
  feature_name: string;
  value: number;
  genres: string[];
}

export class Dataset {
  readonly rows: CsvRow[];
  readonly genres: string[];
  readonly genreCounts: Map<string, number>;

  constructor(data: CsvRow[]) {
    this.rows = data;

    const genres = data.flatMap((r) => r.genres());
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

  static fromBlob(blob: string): Dataset {
    return new Dataset(d3.csvParse(blob).map((rawRow) => new CsvRow(rawRow)));
  }

  toUniqueArtistsRollup(props: {
    yearStart: number;
    yearEnd: number;
    genreToggles: GenreToggleMap;
  }): UniqueArtistsRollup[] {
    const selected = props.genreToggles.selectedGenres();
    const data = this.rows
      .filter((r) => r.year() >= props.yearStart)
      .filter((r) => r.year() <= props.yearEnd)
      .filter(
        (r) =>
          isEmpty(selected) || intersection(selected, r.genres()).length > 0
      )
      .filter((r) => r.decade() > 0)
      .map((r) => ({
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

  toGenreVisRow(props: {
    yearStart: number;
    yearEnd: number;
    genreToggles: GenreToggleMap;
  }): GenreVisRow[] {
    const selected = props.genreToggles.selectedGenres();
    return this.rows
      .filter((r) => r.year() >= props.yearStart)
      .filter((r) => r.year() <= props.yearEnd)
      .filter(
        (r) =>
          isEmpty(selected) || intersection(selected, r.genres()).length > 0
      )
      .flatMap((r) => {
        const year = r.album_release_date.slice(0, 4);
        return audioFeatures.map<GenreVisRow>((feature_name) => ({
          year: Number(year),
          feature_name: feature_name,
          value: r[feature_name] ? Number(r[feature_name]) : 0,
          genres: r.genres(),
        }));
      });
  }
}
