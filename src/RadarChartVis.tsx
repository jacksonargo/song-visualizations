import { Box, Grid } from "@mui/material";
import * as d3 from "d3";
import { VegaLite } from "react-vega";
import { DataFilter, DataFilterProps } from "./DataFilter";
import { Dataset } from "./Dataset";
import { RadarChartData, RadarChartSpec } from "./RadarChartSpec";
import { uniq } from "lodash/fp";

export interface RadarChartVisProps extends DataFilterProps {
  height: number;
  width: number;
  dataset: Dataset;
  padding: number;
  show: boolean;
}

export function RadarChartVis(props: RadarChartVisProps) {
  if (!props.show) return <Box />;

  const filter = new DataFilter(props);
  const data = props.dataset.toGenreVisRow(filter).map<RadarChartData>((r) => ({
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
