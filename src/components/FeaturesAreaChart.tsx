import { Box } from "@mui/material";
import { VegaLite } from "react-vega";
import { Filter, FilterProps } from "../data/Filter";
import { Dataset } from "../data/Dataset";
import { AreaChartSpec } from "../spec/features/AreaChartSpec";

export interface FeaturesAreaChartProps extends FilterProps {
  height: number;
  width: number;
  dataset: Dataset;
  show: boolean;
}

export function FeaturesAreaChart(props: FeaturesAreaChartProps) {
  if (!props.show) return <Box />;
  const filter = new Filter(props);
  return (
    <Box>
      <VegaLite
        spec={AreaChartSpec({
          ...props,
          ...filter,
          data: props.dataset.toFeaturesVisRow(filter),
        })}
      />
    </Box>
  );
}
