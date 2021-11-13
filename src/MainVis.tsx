import * as d3 from "d3";
import { useEffect, useState } from "react";
import { VegaLite, VisualizationSpec } from "react-vega";
import { CsvRow } from "./CsvRow";
import dataSrc from "./spotify_decades.csv";

const audio_features = [
  "danceability",
  "energy",
  "speechiness",
  "acousticness",
  "instrumentalness",
  "liveness",
  "valence",
];

function dataBytesToCsvRow(dataBytes: string) {
  return d3.csvParse(dataBytes).map((rawRow) => new CsvRow(rawRow));
}

function parseData(dataBytes: string) {
  return dataBytesToCsvRow(dataBytes).flatMap((r) => {
    const year = r.album_release_date.slice(0, 4);
    return audio_features.map<GenreData>((feature_name) => ({
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

export function MainVis() {
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
  if (!dataBytes) return <p>Loading...</p>;
  const data = parseData(dataBytes);

  return (
    <div>
      <PlotGenreFeatures data={data} />
    </div>
  );
}

interface GenreData {
  year: number;
  feature_name: string;
  value: number;
  genres: string[];
}

function PlotGenreFeatures(props: {
  data: GenreData[];
  genreName?: string;
  yearStart?: number;
  yearEnd?: number;
}) {
  const genreName = props.genreName ?? "";
  const yearStart = props.yearStart ?? 0;
  const yearEnd = props.yearEnd ?? 3000;

  let title = "Audio Feature Variation";
  if (genreName.length > 0)
    title += " | " + genreName.replace(/^\w/, (c) => c.toUpperCase());

  const spec: VisualizationSpec = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    mark: { type: "area" },
    title: title,
    data: {
      values: props.data,
      // .filter((r) => r.genres.includes(genreName))
      // .filter((r) => r.year >= yearStart)
      // .filter((r) => r.year <= yearEnd),
    },
    width: 1000,
    height: 300,
    encoding: {
      x: {
        field: "year",
        type: "quantitative",
        title: "Year",
        axis: { format: "d" },
      },
      y: {
        aggregate: "sum",
        field: "value",
        title: "Feature Dominance",
        stack: "normalize",
      },
      color: { field: "feature_name", type: "nominal", title: "Audio Feature" },
    },
  };
  console.log(spec);
  return <VegaLite spec={spec} />;
}
