import { Box, Stack } from "@mui/material";
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
    <Stack spacing={4} mx={"auto"}>
      <h2 id={"FeaturesChart"}>{props.title}</h2>
      <p>
        See how the different features of top hits have changed over the
        decades. Use the filters on the left to select particular features and
        genres.
      </p>
      <em id={"FeaturesAsProportion"}>Compare features as a proportions.</em>
      <FeaturesAreaChart
        dataset={props.dataset}
        filter={props.filter}
        height={300}
        width={props.width}
      />
      <em id={"FeaturesByDecade"}>Compare features by decade.</em>
      <FeaturesRadarChart
        chartStyle={{
          height: 600,
          width: 600,
          circleWidth: 400, //Width of the circle
          circleHeight: 400, //Height of the circle
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
          color: d3
            .scaleOrdinal()
            .range([
              "#1D9A6C",
              "#39A96B",
              "#56B870",
              "#74C67A",
              "#99D492",
              "#BFE1B0",
              "#DEEDCF",
            ]),
          fontFamily: "sans-serif",
          textColor: "#000000",
          backgroundColor: "#FFFFFF",
        }}
      />
    </Stack>
  );
}
