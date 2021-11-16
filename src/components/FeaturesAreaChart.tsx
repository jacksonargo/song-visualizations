import { Box } from "@mui/material";
import { VegaLite } from "react-vega";
import { Filter } from "../data/Filter";
import { Dataset } from "../data/Dataset";
import { AreaChartSpec } from "../spec/features/AreaChartSpec";

export interface FeaturesAreaChartProps {
  filter: Filter;
  height: number;
  width: number;
  dataset: Dataset;
  show: boolean;
}

export function FeaturesAreaChart(props: FeaturesAreaChartProps) {
  if (!props.show) return <Box />;
  return (
    <Box>
      <VegaLite
        spec={AreaChartSpec({
          ...props,
          ...props.filter,
          data: props.dataset.unpivotFeatures(props.filter),
        })}
      />
    </Box>
  );
}
