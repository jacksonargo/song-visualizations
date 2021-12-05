import { Box } from "@mui/material";
import * as d3 from "d3";
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
      <FeaturesRadarChart
        chartStyle={{
          height: 800,
          width: 800,
          circleWidth: 600, //Width of the circle
          circleHeight: 600, //Height of the circle
          labelFactor: 1.25, //How much farther than the radius of the outer circle should the labels be placed
          wrapWidth: 60, //The number of pixels after which a label needs to be given a new line
          opacityArea: 0.35, //The opacity of the area of the blob
          dotRadius: 4, //The size of the colored circles of each blog
          opacityCircles: 0.1, //The opacity of the circles of each blob
          strokeWidth: 2, //The width of the stroke around each blob
          margin: { top: 100, right: 100, bottom: 100, left: 100 },
          maxValue: 1,
          levels: 1,
          roundStrokes: true,
          color: d3.scaleOrdinal().range(["#7FB3D5", "#F1948A"]),
          fontFamily: "sans-serif",
          textColor: "#000000",
          backgroundColor: "#FFFFFF",
        }}
      />
    </Box>
  );
}
