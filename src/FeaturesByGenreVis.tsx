import { Box, Grid } from "@mui/material";
import { VegaLite } from "react-vega";
import { Dataset, GenreVisRow } from "./Dataset";
import { FeaturesByGenreSpec } from "./FeatureByGenreSpec";
import { GenreToggleMap } from "./GenreToggles";

export function FeaturesByGenreVis(props: {
  genreToggles: GenreToggleMap;
  yearStart: number;
  yearEnd: number;
  height: number;
  width: number;
  dataset: Dataset;
}) {
  return (
    <Box>
      <VegaLite
        spec={FeaturesByGenreSpec({
          ...props,
          data: props.dataset.toGenreVisRow(props),
        })}
      />
    </Box>
  );
}

export default FeaturesByGenreVis;
