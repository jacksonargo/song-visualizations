import { Grid } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { ArtistsVisRow, Dataset } from "../data/Dataset";
import { Filter } from "../data/Filter";
import { SummaryBarChartSpec } from "../spec/artists/SummaryBarChartSpec";
import { ArtistsByDecadeBarChart } from "./ArtistsByDecadeBarChart";
import { ArtistsByDecadeDonutChart } from "./ArtistsByDecadeDonutChart";

export function ArtistsSummaryChart(props: {
  title: string;
  dataset: Dataset;
  filter: Filter;
  height: number;
  width: number;
  margin: { left: number; right: number; top: number; bottom: number };
}) {
  const [selectedDecade, setSelectedDecade] = useState<number>(
    props.filter.yearEnd - 10
  );
  const [hoverDecade, setHoverDecade] = useState<number | undefined>(undefined);
  const onBarClick = (d: ArtistsVisRow) => setSelectedDecade(d.decade);
  const onBarMouseover = (d: ArtistsVisRow) => setHoverDecade(d.decade);
  const onBarMouseout = (d: ArtistsVisRow) => {
    if (d.decade === hoverDecade) setHoverDecade(undefined);
  };

  const fill = Object.freeze({
    selected: "#314e8c",
    hover: "#17198d",
    normal: "#adc2eb",
  });
  const barFill = (d: ArtistsVisRow): string => {
    switch (d.decade) {
      case selectedDecade:
        return fill.selected;
      case hoverDecade:
        return fill.hover;
      default:
        return fill.normal;
    }
  };

  const summaryRollup = props.dataset
    .toArtistsVisRow(props.filter)
    .filter((r) => r.distinctArtists > 1)
    .sort((a, b) => a.decade - b.decade);

  return (
    <Grid container>
      <Grid item xs={12}>
        <h2>{props.title}</h2>
        <h3>
          {selectedDecade ?? 2010} - {selectedDecade ?? 2020}
        </h3>
      </Grid>
      <Grid item md={6}>
        <SummaryBarChart
          {...props}
          rollupData={summaryRollup}
          width={props.width / 2}
          height={props.height / 2}
          onBarClick={onBarClick}
          onBarMouseover={onBarMouseover}
          onBarMouseout={onBarMouseout}
          barFill={barFill}
        />
        <ArtistsByDecadeDonutChart
          {...props}
          topN={10}
          decade={selectedDecade ?? 2010}
          width={props.width / 2}
          height={props.height / 2}
        />
      </Grid>
      <Grid item md={6} alignContent={"center"}>
        <ArtistsByDecadeBarChart
          {...props}
          topN={10}
          width={props.width / 2}
          decade={selectedDecade ?? 2010}
        />
      </Grid>
    </Grid>
  );
}

function SummaryBarChart(props: {
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
