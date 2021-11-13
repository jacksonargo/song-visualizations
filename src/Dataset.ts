import * as d3 from "d3";
import { uniq } from "lodash/fp";
import { CsvRow } from "./CsvRow";

const audioFeatures = [
  "danceability",
  "energy",
  "speechiness",
  "acousticness",
  "instrumentalness",
  "liveness",
  "valence",
];

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
    const genres = data.flatMap((r) =>
      r.artist_genres // This field appears to contain a json array of strings,
        .replaceAll(/[[\]'"]/gi, "") // but it isn't valid json. Thankfully, it's easy to parse ourselves.
        .split(",")
        .map((genre_name) => genre_name.trim())
        .filter((genre_name) => genre_name.length > 0)
    );

    this.rows = data;

    this.genreCounts = genres.reduce(
      (counter, genre) => counter.set(genre, 1 + (counter.get(genre) ?? 0)),
      new Map<string, number>()
    );

    console.log(this.genreCounts);
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

  toGenreVisData(): GenreVisRow[] {
    return this.rows.flatMap((r) => {
      const year = r.album_release_date.slice(0, 4);
      return audioFeatures.map<GenreVisRow>((feature_name) => ({
        year: Number(year),
        feature_name: feature_name,
        value: r[feature_name] ? Number(r[feature_name]) : 0,
        genres: r.artist_genres // This field appears to contain a json array of strings,
          .replaceAll(/[[\]'"]/gi, "") // but it isn't valid json. Thankfully, it's easy to parse ourselves.
          .split(",")
          .map((genre_name) => genre_name.trim())
          .filter((genre_name) => genre_name.length > 0),
      }));
    });
  }
}
