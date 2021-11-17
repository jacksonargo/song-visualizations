import { VisualizationSpec } from "react-vega";
import { ArtistsVisRow } from "../../data/Dataset";

export function SingleDecadeBarsSpec(props: {
  data: ArtistsVisRow[];
  height: number;
  width: number;
}): VisualizationSpec {
  const values = props.data.map((r) => ({ ...r, margin: 0.1 }));
  return {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    data: { values: values },
    width: props.width,
    height: props.height,
    encoding: {
      y: {
        field: "artist",
        type: "nominal",
        axis: { title: null, ticks: false, labels: false, grid: false },
        sort: { field: "count", op: "sum", order: "descending" },
      },
    },
    layer: [
      {
        mark: { type: "bar", tooltip: true },
        encoding: {
          x: {
            field: "count",
            type: "quantitative",
            axis: { title: "Number of Top Hits" },
          },
          color: {
            field: "artist",
            type: "nominal",
            legend: null,
          },
        },
      },
      {
        mark: { type: "text", align: "left" },
        encoding: {
          x: { field: "margin", type: "quantitative" },
          text: { type: "nominal", field: "artist" },
        },
      },
    ],
  };
}
