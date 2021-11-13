import { Box } from "@mui/material";
import { VegaLite } from "react-vega";
import { DataFilter, DataFilterProps } from "./DataFilter";
import { Dataset } from "./Dataset";
import { FeaturesByGenreSpec } from "./FeatureByGenreSpec";

export interface FeaturesByGenreVisProps extends DataFilterProps {
  height: number;
  width: number;
  dataset: Dataset;
  show: boolean;
}

export function FeaturesByGenreVis(props: FeaturesByGenreVisProps) {
  if (!props.show) return <Box />;
  const filter = new DataFilter(props);
  return (
    <Box>
      <VegaLite
        spec={FeaturesByGenreSpec({
          ...props,
          ...filter,
          data: props.dataset.toGenreVisRow(filter),
        })}
      />
    </Box>
  );
}

export default FeaturesByGenreVis;
