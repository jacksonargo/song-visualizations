import { Box, Grid } from "@mui/material";
import * as d3 from "d3";
import { uniq } from "lodash/fp";
import { VegaLite } from "react-vega";
import { Filter, FilterProps } from "../data/Filter";
import { ArtistsVisRow, Dataset } from "../data/Dataset";
import { SingleDecadeBarsSpec } from "../spec/artists/SingleDecadeBarsSpec";
import { SingleDecadeDonutSpec } from "../spec/artists/SingleDecadeDonutSpec";

export interface TopArtistsByDecadeVisProps extends FilterProps {
  dataset: Dataset;
  innerRadius?: number;
  padAngle?: number;
  height: number;
  width: number;
  topN: number;
  show: boolean;
}

export function ArtistsByDecadeChart(props: TopArtistsByDecadeVisProps) {
  if (!props.show) return <Box />;

  const rollup = props.dataset
    .toArtistsVisRow(new Filter(props))
    .filter((r) => r.artist !== "");
  const decadeGrouping = d3.group(rollup, (r) => r.decade);

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

  const artistsSummary: ArtistsVisRow[] = [];
  const topArtists: ArtistsVisRow[] = [];
  Array.from(decadeGrouping.entries()).forEach(([decade, grouping]) => {
    const sorted = grouping.sort((a, b) => a.count - b.count).reverse();

    const decadeTopArtists = sorted.slice(0, props.topN);
    const summaryTop = decadeTopArtists.reduce(
      summarize,
      initSummary(decade, `Top ${props.topN}\nArtists`)
    );

    const decodeOther = sorted.slice(props.topN, -1);
    const summaryOthers = decodeOther.reduce(
      summarize,
      initSummary(decade, "Others")
    );

    artistsSummary.push(summaryOthers);
    artistsSummary.push(summaryTop);
    topArtists.push(...decadeTopArtists);
  });

  const decades = uniq(topArtists.map((r) => r.decade)).sort();
  return (
    <Box>
      {decades.map((decade) => (
        <Grid key={decade} container>
          <Grid item xs={12}>
            <h3>{decade}</h3>
          </Grid>
          <Grid item md={6}>
            <h4>
              How many tops hits were produced by the top {props.topN} artists?
            </h4>
            <VegaLite
              width={350}
              spec={SingleDecadeDonutSpec({
                ...props,
                data: artistsSummary.filter((r) => r.decade === decade),
              })}
            />
          </Grid>
          <Grid item md={6}>
            <VegaLite
              width={350}
              spec={SingleDecadeBarsSpec({
                ...props,
                data: topArtists.filter((r) => r.decade === decade),
              })}
            />
          </Grid>
        </Grid>
      ))}
    </Box>
  );
}
