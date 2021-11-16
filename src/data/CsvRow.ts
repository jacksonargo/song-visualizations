import * as d3 from "d3";
import { useEffect, useState } from "react";
import dataSrc from "./spotify_decades.csv";

export interface CsvRowSchema {
  name?: string;
  artist?: string;
  album_name?: string;
  album_image_url?: string;
  album_release_date?: string;
  duration_ms?: string;
  explicit?: string;
  popularity?: string;
  preview_url?: string;
  danceability?: string;
  energy?: string;
  key?: string;
  loudness?: string;
  mode?: string;
  speechiness?: string;
  acousticness?: string;
  instrumentalness?: string;
  liveness?: string;
  valence?: string;
  tempo?: string;
  time_signature?: string;
  artist_followers?: string;
  artist_genres?: string;
  artist_popularity?: string;
  track_id?: string;
  [s: string]: string | undefined;
}

export class CsvRow {
  name: string = "";
  artist: string = "";
  album_name: string = "";
  album_image_url: string = "";
  album_release_date: string = "";
  duration_ms: string = "";
  explicit: string = "";
  popularity: string = "";
  preview_url: string = "";
  danceability: string = "";
  energy: string = "";
  key: string = "";
  loudness: string = "";
  mode: string = "";
  speechiness: string = "";
  acousticness: string = "";
  instrumentalness: string = "";
  liveness: string = "";
  valence: string = "";
  tempo: string = "";
  time_signature: string = "";
  artist_followers: string = "";
  artist_genres: string = "";
  artist_popularity: string = "";
  track_id: string = "";
  [s: string]: string | (() => number) | (() => string[]);

  constructor(rawRow: d3.DSVRowString) {
    for (const i in rawRow) this[i] = rawRow[i] ?? "";
  }

  year(): number {
    return Number(this.album_release_date.slice(0, 4));
  }

  decade(): number {
    return this.year() - (this.year() % 10);
  }

  genres(): string[] {
    return this.artist_genres // This field appears to contain a json array of strings,
      .replaceAll(/[[\]'"]/gi, "") // but it isn't valid json. Thankfully, it's easy to parse ourselves.
      .split(",")
      .map((genre_name) => genre_name.trim())
      .filter((genre_name) => genre_name.length > 0);
  }
}

export function useCsvData() {
  const [dataBytes, setDataBytes] = useState(
    sessionStorage.getItem("dataBytes")
  );
  useEffect(() => {
    if ((dataBytes?.length ?? 0) > 0) return;
    fetch(dataSrc)
      .then((resp) => resp.text())
      .then((data) => {
        if (data) {
          setDataBytes(data);
          sessionStorage.setItem("dataBytes", data);
        }
      });
  });
  return dataBytes;
}
