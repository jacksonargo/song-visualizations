import React, { useEffect, useRef } from "react";
import { ArtistsVisRow } from "../data/Dataset";
import { SummaryBarChartSpec } from "../spec/artists/SummaryBarChartSpec";

export function ArtistSummaryBarChart(props: {
  rollupData: ArtistsVisRow[];
  height: number;
  width: number;
  margin: { left: number; right: number; top: number; bottom: number };
  onBarClick: (e: ArtistsVisRow) => void;
  onBarMouseover: (d: ArtistsVisRow) => void;
  onBarMouseout: (d: ArtistsVisRow) => void;
  barFill: (d: ArtistsVisRow) => string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const svg = SummaryBarChartSpec({ ref, ...props });
    return () => {
      svg.remove();
    };
  });
  return <div ref={ref} />;
}
