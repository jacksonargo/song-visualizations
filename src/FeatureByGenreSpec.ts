import { VisualizationSpec } from "react-vega";
import { GenreVisRow } from "./Dataset";
import { uniq } from "lodash/fp";

export function FeaturesByGenreSpec(props: {
  data: GenreVisRow[];
  height: number;
  width: number;
  yearStart: number;
  yearEnd: number;
}): VisualizationSpec {
  const decades = uniq(props.data.map((r) => r.decade)).sort();

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
        axis: { format: "d", values: uniq(decades) },
        scale: { domain: [props.yearStart, props.yearEnd] },
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
