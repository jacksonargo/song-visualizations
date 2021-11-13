import { Box, Grid } from "@mui/material";
import * as d3 from "d3";
import { uniq } from "lodash/fp";
import { VegaLite, VisualizationSpec } from "react-vega";
import { DataFilter, DataFilterProps } from "./DataFilter";
import { Dataset, UniqueArtistsRollup } from "./Dataset";

export interface TopArtistsByDecadeVisProps extends DataFilterProps {
  dataset: Dataset;
  innerRadius?: number;
  padAngle?: number;
  height: number;
  width: number;
  topN: number;
  show: boolean;
}

export function TopArtistsByDecadeVis(props: TopArtistsByDecadeVisProps) {
  if (!props.show) return <Box />;

  const rollup = props.dataset
    .toUniqueArtistsRollup(new DataFilter(props))
    .filter((r) => r.artist !== "");
  const decadeGrouping = d3.group(rollup, (r) => r.decade);

  const initSummary = (decade: number, name: string): UniqueArtistsRollup => ({
    decade: decade,
    distinctArtists: 0,
    artist: name,
    genres: [] as string[],
    count: 0,
  });

  const summarize = (a: UniqueArtistsRollup, b: UniqueArtistsRollup) => ({
    ...a,
    count: a.count + b.count,
    distinctArtists: a.distinctArtists + b.distinctArtists,
    genres: uniq([...a.genres, ...b.genres]),
  });

  const artistsSummary: UniqueArtistsRollup[] = [];
  const topArtists: UniqueArtistsRollup[] = [];
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
              spec={TopArtistsByDecadeDonutSpec({
                ...props,
                data: artistsSummary.filter((r) => r.decade === decade),
              })}
            />
          </Grid>
          <Grid item md={6}>
            <VegaLite
              width={350}
              spec={TopArtistsByDecadeBarsSpec({
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

export default TopArtistsByDecadeVis;

export function TopArtistsByDecadeDonutSpec(props: {
  data: UniqueArtistsRollup[];
  height: number;
  width: number;
  innerRadius?: number;
  radius?: number;
  padAngle?: number;
}): VisualizationSpec {
  const radius = props.radius ?? 120;
  const innerRadius = props.innerRadius ?? 60;
  const textRadius = (radius - innerRadius) / 2 + innerRadius;
  const padAngle = props.innerRadius ?? 0.01;

  return {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    layer: [
      {
        mark: { type: "arc", tooltip: true, radius, innerRadius, padAngle },
        encoding: {
          theta: { type: "quantitative", field: "count", stack: true },
          color: {
            field: "artist",
            type: "nominal",
          },
        },
      },
      {
        mark: { type: "text", radius: textRadius },
        encoding: {
          theta: { type: "quantitative", field: "count", stack: true },
          text: { type: "nominal", field: "artist" },
        },
      },
    ],
    data: { values: props.data },
    width: props.width,
    height: props.height,
  };
}

export function TopArtistsByDecadeBarsSpec(props: {
  data: UniqueArtistsRollup[];
  height: number;
  width: number;
}): VisualizationSpec {
  return {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    mark: { type: "bar", tooltip: true },
    data: { values: props.data },
    width: props.width,
    height: props.height,
    encoding: {
      x: {
        field: "count",
        type: "quantitative",
        axis: { title: "Number of Top Hits" },
      },
      y: { field: "artist", type: "nominal" },
      color: {
        field: "artist",
        type: "nominal",
      },
    },
  };
}
