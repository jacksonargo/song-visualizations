import * as d3 from "d3";
import React, { useEffect, useRef } from "react";
import { RadarChart } from "../spec/features/RadarChartSpec";

interface ChartStyle {
  height: number;
  width: number;
  circleWidth: number;
  circleHeight: number;
  labelFactor: number;
  wrapWidth: number;
  opacityArea: number;
  dotRadius: number;
  opacityCircles: number;
  strokeWidth: number;
  margin: { top: number; right: number; bottom: number; left: number };
  maxValue: number;
  levels: number;
  roundStrokes: boolean;
  color: d3.ScaleOrdinal<string, unknown>;
  fontFamily: string;
  textColor: string;
  backgroundColor: string;
}

export function FeaturesRadarChart(props: { chartStyle: ChartStyle }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const svg = RadarChart(ref, "80s", "90s", props.chartStyle);
    return () => {
      svg.remove();
    };
  });
  return (
    <div
      ref={ref}
      style={{ width: props.chartStyle.width, height: props.chartStyle.height }}
    />
  );
}
