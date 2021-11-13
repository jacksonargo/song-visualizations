import { VisualizationSpec } from "react-vega";
import { GenreVisRow } from "./Dataset";

export function FeaturesByGenreSpec(
  title: string,
  data: GenreVisRow[],
  genres: string[],
  yearStart: number,
  yearEnd: number,
  height: number = 300,
  width: number = 800
): VisualizationSpec {
  return {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    mark: { type: "area" },
    title: title,
    width: width,
    height: height,
    data: {
      values: data
        .filter((row) => {
          if (genres.length === 0) return true;
          return row.genres.filter((name) => genres?.includes(name)).length > 0;
        })
        .filter((r) => r.year >= yearStart)
        .filter((r) => r.year <= yearEnd),
    },
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
}
