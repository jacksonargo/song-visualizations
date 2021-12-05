import { Grid } from "@mui/material";
import React, { useState } from "react";
import { ArtistsVisRow, Dataset } from "../data/Dataset";
import { Filter } from "../data/Filter";
import { ArtistsByDecadeBarChart } from "./ArtistsByDecadeBarChart";
import { ArtistsByDecadeDonutChart } from "./ArtistsByDecadeDonutChart";
import { ArtistSummaryBarChart } from "./ArtistSummaryBarChart";

export function ArtistsChart(props: {
  id: string;
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
        <h2 id={props.id}> {props.title}</h2>
        <h3>
          {selectedDecade ?? 2010} - {selectedDecade ?? 2020}
        </h3>
      </Grid>
      <Grid item md={6}>
        <ArtistSummaryBarChart
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
