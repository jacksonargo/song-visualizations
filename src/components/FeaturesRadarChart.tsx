import { Box, Grid } from "@mui/material";
import * as d3 from "d3";
import { uniq } from "lodash/fp";
import { VegaLite } from "react-vega";
import { Dataset } from "../data/Dataset";
import { Filter } from "../data/Filter";
import {
  RadarChartData,
  RadarChartSpec,
} from "../spec/features/RadarChartSpec";

export interface RadarChartVisProps {
  height: number;
  width: number;
  dataset: Dataset;
  padding: number;
  show: boolean;
  filter: Filter;
}

export function FeaturesRadarChart(props: RadarChartVisProps) {
  if (!props.show) return <Box />;

  const data = props.dataset
    .unpivotFeatures(props.filter)
    .map<RadarChartData>((r) => ({
      key: r.feature_name,
      category: r.decade,
      value: r.value,
    }));

  const rollup: RadarChartData[] = d3
    .flatGroup(
      data,
      (r) => r.category,
      (r) => r.key
    )
    .map(([category, key, grouping]) => ({
      category,
      key,
      value: grouping.reduce((val, x) => val + x.value, 0),
    }));

  const decades = uniq(rollup.map((r) => r.category)).sort();
  return (
    <Box>
      <Grid container>
        {decades.map((decade) => (
          <Grid key={decade} item md={6}>
            <h3>{decade}</h3>
            <VegaLite
              spec={RadarChartSpec({
                ...props,
                data: rollup.filter((r) => decade === r.category),
              })}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
