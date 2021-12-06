import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import * as d3 from "d3";
import React, { useEffect, useRef, useState } from "react";
import { FeatureRadarRollup } from "../spec/features/FeatureRadarRollup";
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
  const [startDecade, setStartDecade] = useState(1950);
  const [endDecade, setEndDecade] = useState(2010);

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const svg = RadarChart(
      ref,
      props.chartStyle,
      Object.keys(FeatureRadarRollup).filter(
        (k) => Number(k) >= startDecade && Number(k) <= endDecade
      )
    );
    return () => {
      svg.remove();
    };
  });
  return (
    <Grid container spacing={2}>
      <Grid item>
        <Stack spacing={3}>
          <FormControl>
            <InputLabel>Start</InputLabel>
            <Select
              defaultValue={startDecade}
              label="Start"
              onChange={(e) => setStartDecade(Number(e.target.value))}
            >
              {Object.keys(FeatureRadarRollup).map((k) => (
                <MenuItem
                  key={k}
                  value={k}
                  disabled={Number(k) > Math.max(1950, endDecade)}
                >
                  {k}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel>End</InputLabel>
            <Select
              defaultValue={endDecade}
              label="End"
              onChange={(e) => setEndDecade(Number(e.target.value))}
            >
              {Object.keys(FeatureRadarRollup).map((k) => (
                <MenuItem
                  key={k}
                  value={k}
                  disabled={Number(k) < Math.min(2010, startDecade)}
                >
                  {k}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Grid>
      <Grid>
        <div
          ref={ref}
          style={{
            width: props.chartStyle.width,
            height: props.chartStyle.height,
          }}
        />
      </Grid>
    </Grid>
  );
}
