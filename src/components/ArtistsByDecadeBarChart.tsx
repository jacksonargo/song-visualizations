import { VegaLite } from "react-vega";
import { Dataset } from "../data/Dataset";
import { Filter } from "../data/Filter";
import { SingleDecadeBarsSpec } from "../spec/artists/SingleDecadeBarsSpec";

export function ArtistsByDecadeBarChart(props: {
  dataset: Dataset;
  filter: Filter;
  topN: number;
  height: number;
  width: number;
  decade: number;
}) {
  const data = props.dataset
    .toArtistsVisRow(props.filter)
    .filter((r) => r.artist.length > 0)
    .filter((r) => r.decade === props.decade)
    .sort((a, b) => b.count - a.count)
    .slice(0, props.topN);
  return <VegaLite spec={SingleDecadeBarsSpec({ ...props, data })} />;
}
