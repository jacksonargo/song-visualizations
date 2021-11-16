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
  const radius = props.radius ?? 120;
  const innerRadius = props.innerRadius ?? 60;
  const textRadius = (radius - innerRadius) / 2 + innerRadius;
  const padAngle = props.innerRadius ?? 0.01;

  return {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    layer: [
      {
        mark: { type: "arc", tooltip: true, radius, innerRadius, padAngle },
        encoding: {
          theta: { type: "quantitative", field: "count", stack: true },
          color: {
            field: "artist",
            type: "nominal",
          },
        },
      },
      {
        mark: { type: "text", radius: textRadius },
        encoding: {
          theta: { type: "quantitative", field: "count", stack: true },
          text: { type: "nominal", field: "artist" },
        },
      },
    ],
    data: { values: props.data },
    width: props.width,
    height: props.height,
  };
}
