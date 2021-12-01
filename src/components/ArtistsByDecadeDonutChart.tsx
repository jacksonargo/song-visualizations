import { Stack } from "@mui/material";
import { uniq, range } from "lodash/fp";
import { VegaLite } from "react-vega";
import { ArtistsVisRow, Dataset } from "../data/Dataset";
import { Filter } from "../data/Filter";
import { SingleDecadeDonutSpec } from "../spec/artists/SingleDecadeDonutSpec";

export function ArtistsByDecadeDonutChart(props: {
  dataset: Dataset;
  filter: Filter;
  topN: number;
  height: number;
  width: number;
  decade: number;
  innerRadius?: number;
  padAngle?: number;
}) {
  const filtered = props.dataset
    .toArtistsVisRow(props.filter)
    .filter((r) => r.decade === props.decade);

  const initSummary = (decade: number, name: string): ArtistsVisRow => ({
    decade: decade,
    distinctArtists: 0,
    artist: name,
    genres: [] as string[],
    count: 0,
  });

  const summarize = (a: ArtistsVisRow, b: ArtistsVisRow) => ({
    ...a,
    count: a.count + b.count,
    distinctArtists: a.distinctArtists + b.distinctArtists,
    genres: uniq([...a.genres, ...b.genres]),
  });

  const sorted = filtered.sort((a, b) => a.count - b.count).reverse();
  const data = range(1, sorted.length / 5)
    .map((n) => n * 5)
    .map((n) => {
      const name = n > 0 ? `Top ${n}` : `Others`;
      return sorted
        .slice(0, n)
        .reduce(summarize, initSummary(props.decade, name));
    });

  return (
    <Stack justifyContent="center">
      <VegaLite spec={SingleDecadeDonutSpec({ ...props, data })} />
    </Stack>
  );
}
