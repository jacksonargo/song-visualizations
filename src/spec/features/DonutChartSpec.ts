import { VisualizationSpec } from "react-vega";

export function DonutChartSpec(props: {
  data: { value: number; featureName: string }[];
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
      x: { type: "quantitative", field: "value" },
      y: { type: "nominal", field: "featureName" },
      color: { type: "nominal", field: "featureName" },
    },
  };
}
