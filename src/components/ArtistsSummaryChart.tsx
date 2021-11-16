import { Box } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { ArtistsVisRow, Dataset } from "../data/Dataset";
import { Filter } from "../data/Filter";
import { SummaryBarChartSpec } from "../spec/artists/SummaryBarChartSpec";

export function ArtistsSummaryChart(props: {
  dataset: Dataset;
  filter: Filter;
  show: boolean;
  yearStart?: number;
  yearEnd?: number;
  height: number;
  width: number;
  margin: { left: number; right: number; top: number; bottom: number };
}) {
  if (!props.show) return <Box />;

  const rollup = props.dataset
    .toArtistsVisRow(props.filter)
    .filter((r) => r.distinctArtists > 1);

  rollup.sort((a, b) => a.decade - b.decade);

  return (
    <Box>
      <BarChart
        rollupData={rollup}
        height={props.height}
        width={props.width}
        margin={props.margin}
      />
    </Box>
  );
}

function BarChart(props: {
  rollupData: ArtistsVisRow[];
  height: number;
  width: number;
  margin: { left: number; right: number; top: number; bottom: number };
}) {
  const visRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const svg = SummaryBarChartSpec({ ref: visRef, ...props });
    return () => {
      svg.remove();
    };
  });
  return <div ref={visRef} />;
}
