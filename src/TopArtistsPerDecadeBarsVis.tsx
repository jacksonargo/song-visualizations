import { Box } from "@mui/material";
import * as d3 from "d3";
import React, { RefObject, useEffect, useRef } from "react";
import { DataFilter } from "./DataFilter";
import { Dataset, UniqueArtistsRollup } from "./Dataset";
import { GenreToggleMap } from "./GenreToggles";

function TopArtistsPerDecadeBarsVis(props: {
  dataset: Dataset;
  show: boolean;
  genreToggles: GenreToggleMap;
  yearStart?: number;
  yearEnd?: number;
  height: number;
  width: number;
  margin: { left: number; right: number; top: number; bottom: number };
}) {
  if (!props.show) return <Box />;

  const rollup = props.dataset
    .toUniqueArtistsRollup({ ...props, ...new DataFilter(props) })
    .filter((r) => r.distinctArtists > 1);

  rollup.sort((a, b) => a.decade - b.decade);

  return (
    <Box>
      <BarChart
        rollupData={rollup}
        height={props.height}
        width={props.width}
        margin={props.margin}
      />
    </Box>
  );
}

function BarChart(props: {
  rollupData: UniqueArtistsRollup[];
  height: number;
  width: number;
  margin: { left: number; right: number; top: number; bottom: number };
}) {
  const visRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const svg = drawBarChart({ ref: visRef, ...props });
    return () => {
      svg.remove();
    };
  });
  return <div ref={visRef} />;
}

function drawBarChart(props: {
  rollupData: UniqueArtistsRollup[];
  ref: RefObject<HTMLDivElement>;
  height: number;
  width: number;
  margin: { left: number; right: number; top: number; bottom: number };
}) {
  const iWidth = props.width - props.margin.left - props.margin.right;
  const iHeight = props.height - props.margin.top - props.margin.bottom;

  const data = props.rollupData;

  const xAttr = "decade";
  const yAttr = "distinctArtists";

  const x = d3
    .scaleBand([0, iWidth])
    .domain(
      Array.from(new Array(8).keys())
        .map((n) => 1950 + n * 10)
        .map((x) => x.toString())
    )
    .padding(0.05);

  const y = d3.scaleLinear([iHeight, 0]).domain([0, 210]);

  const line = d3
    .line<UniqueArtistsRollup>()
    .x((d) => (x(d[xAttr].toString()) ?? 0) + x.bandwidth() / 2)
    .y((d) => y(d.distinctArtists));

  const div = d3.select(props.ref.current);
  const svg = div
    .append("svg")
    .attr("viewBox", `0 0 ${props.width} ${props.height}`);

  const g = svg
    .append("g")
    .attr("transform", `translate(${props.margin.left}, ${props.margin.top})`);

  g.selectAll("rect")
    .data(data)
    .join("rect")
    .attr("x", (d) => x(d[xAttr].toString()) ?? 0)
    .attr("width", () => x.bandwidth())
    .attr("y", (d) => y(d[yAttr]))
    .attr("height", (d) => iHeight - y(d[yAttr]))
    .attr("fill", "#adc2eb");

  g.selectAll(".point")
    .data(data)
    .join("circle")
    .attr("class", "point")
    .attr("cx", (d) => (x(d[xAttr].toString()) ?? 0) + x.bandwidth() / 2)
    .attr("cy", (d) => y(d[yAttr]))
    .attr("r", 2)
    .attr("fill", "black");

  g.append("path")
    .datum(data)
    .attr("d", (d) => line(d))
    .attr("fill", "none")
    .attr("class", "line")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5);

  g.selectAll(".countText")
    .data(data)
    .join("text")
    .text((d) => d.distinctArtists)
    .attr("class", "countText")
    .attr("text-anchor", "middle")
    .attr("x", (d) => (x(d[xAttr].toString()) ?? 0) + x.bandwidth() / 2)
    .attr("y", (d) => y(d[yAttr]) - 15);

  g.append("g")
    .attr("transform", `translate(0, ${iHeight})`)
    .style("font-size", "small")
    .call(d3.axisBottom(x));

  return svg;
}

export default TopArtistsPerDecadeBarsVis;
