import { VisualizationSpec } from "react-vega";
import { ArtistsVisRow } from "../../data/Dataset";

export function SingleDecadeBarsSpec(props: {
  data: ArtistsVisRow[];
  height: number;
  width: number;
}): VisualizationSpec {
  return {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    mark: { type: "bar", tooltip: true },
    data: { values: props.data },
    width: props.width,
    height: props.height,
    encoding: {
      x: {
        field: "count",
        type: "quantitative",
        axis: { title: "Number of Top Hits" },
      },
      y: { field: "artist", type: "nominal" },
      color: {
        field: "artist",
        type: "nominal",
      },
    },
  };
}
