import { Box } from "@mui/material";
import * as d3 from "d3";
import { VegaLite } from "react-vega";
import { Dataset, FeaturesRow } from "../data/Dataset";
import { Filter } from "../data/Filter";
import { DonutChartSpec } from "../spec/features/DonutChartSpec";

export function FeaturesDonutChart(props: {
  hidden: boolean;
  dataset: Dataset;
  filter: Filter;
  height: number;
  width: number;
}) {
  if (props.hidden) return <div />;

  const featureData = props.dataset.unpivotFeatures(props.filter);
  const reduceGroup = (grouping: FeaturesRow[]) =>
    grouping.map((r) => r.value).reduce((a, b) => a + b) / grouping.length;
  const data = d3
    .flatGroup(featureData, (r) => r.feature_name)
    .map(([featureName, grouping]) => ({
      featureName: featureName,
      value: reduceGroup(grouping),
    }));

  return (
    <Box>
      <VegaLite spec={DonutChartSpec({ ...props, data })} />
    </Box>
  );
}
