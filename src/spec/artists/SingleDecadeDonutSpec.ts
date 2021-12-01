import { VisualizationSpec } from "react-vega";
import { ArtistsVisRow } from "../../data/Dataset";

export function SingleDecadeDonutSpec(props: {
  data: ArtistsVisRow[];
  height: number;
  width: number;
  innerRadius?: number;
  radius?: number;
  padAngle?: number;
}): VisualizationSpec {
  return {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    data: { values: props.data },
    width: props.width,
    height: props.height,
    mark: { type: "bar", tooltip: true },
    encoding: {
      color: {
        field: "count",
        type: "quantitative",
        sort: "y",
        legend: null,
      },
      y: {
        field: "count",
        type: "quantitative",
        stack: false,
        sort: { encoding: "color" },
      },
      x: { field: "artist", type: "nominal", sort: "y" },
    },
  };
}
