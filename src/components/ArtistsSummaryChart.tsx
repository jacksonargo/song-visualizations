import { Box } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { GenreToggleMap } from "./GenreToggles";
import { Filter } from "../data/Filter";
import { ArtistsVisRow, Dataset } from "../data/Dataset";
import { SummaryBarChartSpec } from "../spec/artists/SummaryBarChartSpec";

export function ArtistsSummaryChart(props: {
  dataset: Dataset;
  show: boolean;
  genreToggles: GenreToggleMap;
  yearStart?: number;
  yearEnd?: number;
  height: number;
  width: number;
  margin: { left: number; right: number; top: number; bottom: number };
}) {
  if (!props.show) return <Box />;

  const rollup = props.dataset
    .toArtistsVisRow({ ...props, ...new Filter(props) })
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
