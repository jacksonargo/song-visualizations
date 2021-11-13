import { VisualizationSpec } from "react-vega";
import { GenreVisRow } from "./Dataset";

export function FeaturesByGenreSpec(props: {
  data: GenreVisRow[];
  height: number;
  width: number;
}): VisualizationSpec {
  return {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    mark: { type: "area" },
    width: props.width,
    height: props.height,
    data: {
      values: props.data,
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
