import React, { useEffect, useRef } from "react";
import { RadarChart } from "../spec/features/RadarChartSpec";

export function FeaturesRadarChart() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const svg = RadarChart(ref, "80s", "90s");
    return () => {
      svg.remove();
    };
  });
  return <div ref={ref} style={{ width: "100%", height: 800 }} />;
}
