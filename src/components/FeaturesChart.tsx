import { Box } from "@mui/material";
import React from "react";
import { Dataset } from "../data/Dataset";
import { Filter } from "../data/Filter";
import { FeaturesAreaChart } from "./FeaturesAreaChart";
import { FeaturesRadarChart } from "./FeaturesRadarChart";

export function FeaturesChart(props: {
  title: string;
  dataset: Dataset;
  filter: Filter;
  width: number;
}) {
  return (
    <Box>
      <h2>{props.title}</h2>
      <FeaturesAreaChart
        dataset={props.dataset}
        filter={props.filter}
        height={300}
        width={props.width}
      />
      <FeaturesRadarChart />
    </Box>
  );
}
