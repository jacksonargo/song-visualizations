import { Box, Grid } from "@mui/material";
import { VegaLite } from "react-vega";
import { Dataset, GenreVisRow } from "./Dataset";
import { FeaturesByGenreSpec } from "./FeatureByGenreSpec";

export function FeaturesByGenreVis(props: {
  genreToggles: Map<string, boolean>;
  dataset: Dataset;
}) {
  const selectedGenres = Array.from(props.genreToggles.keys()).filter((name) =>
    props.genreToggles.get(name)
  );

  return (
    <Box>
      <h2>Variation in Features</h2>
      <GenreVis
        baseTitle={""}
        data={props.dataset.toGenreVisData()}
        genres={selectedGenres}
      />
    </Box>
  );
}

function GenreVis(props: {
  baseTitle: string;
  data: GenreVisRow[];
  genres?: string[];
  yearStart?: number;
  yearEnd?: number;
}) {
  const yearStart = props.yearStart ?? 0;
  const yearEnd = props.yearEnd ?? 3000;

  let title = props.baseTitle;
  if (props.genres && props.genres.length > 0)
    title += " | " + props.genres[0].replace(/^\w/, (c) => c.toUpperCase());
  if (props.genres && props.genres.length > 1) title += ", and others";

  return (
    <VegaLite
      spec={FeaturesByGenreSpec(
        title,
        props.data,
        props.genres ?? [],
        yearStart,
        yearEnd
      )}
    />
  );
}

export default FeaturesByGenreVis;
