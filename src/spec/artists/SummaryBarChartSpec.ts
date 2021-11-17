import * as d3 from "d3";
import { RefObject } from "react";
import { ArtistsVisRow } from "../../data/Dataset";
import { uniq } from "lodash/fp";

export function SummaryBarChartSpec(props: {
  rollupData: ArtistsVisRow[];
  ref: RefObject<HTMLDivElement>;
  height: number;
  width: number;
  margin: { left: number; right: number; top: number; bottom: number };
  onBarClick: (d: ArtistsVisRow) => void;
  onBarMouseover: (d: ArtistsVisRow) => void;
  onBarMouseout: (d: ArtistsVisRow) => void;
  barFill: (d: ArtistsVisRow) => string;
}) {
  const iWidth = props.width - props.margin.left - props.margin.right;
  const iHeight = props.height - props.margin.top - props.margin.bottom;

  const data = props.rollupData;
  const decades = uniq(data.map((r) => r.decade)).sort();

  const xAttr = "decade";
  const yAttr = "distinctArtists";

  const [minDecade, maxDecade] = [decades[0], decades[decades.length - 1] + 10];
  const x = d3.scaleLinear([0, iWidth]).domain([minDecade, maxDecade]);
  const xBandwidth = x(minDecade + 10) - x(minDecade);

  const y = d3.scaleLinear([iHeight, 0]).domain([0, 210]);

  const line = d3
    .line<ArtistsVisRow>()
    .x((d) => (x(d[xAttr]) ?? 0) + xBandwidth / 2)
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
    .attr("x", (d) => x(d[xAttr]) + 0.01 * xBandwidth)
    .attr("width", () => 0.98 * xBandwidth)
    .attr("y", (d) => y(d[yAttr]))
    .attr("height", (d) => iHeight - y(d[yAttr]))
    .attr("fill", (d) => props.barFill(d))
    .attr("cursor", "pointer")
    .on("click", (e, d) => props.onBarClick(d))
    .on("mouseover", (e, d) => props.onBarMouseover(d))
    .on("mouseout", (e, d) => props.onBarMouseout(d));

  g.selectAll(".point")
    .data(data)
    .join("circle")
    .attr("class", "point")
    .attr("cx", (d) => (x(d[xAttr]) ?? 0) + xBandwidth / 2)
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
    .attr("x", (d) => (x(d[xAttr]) ?? 0) + xBandwidth / 2)
    .attr("y", (d) => y(d[yAttr]) - 15);

  g.append("g")
    .attr("transform", `translate(0, ${iHeight})`)
    .style("font-size", "small")
    .call(d3.axisBottom(x).tickValues([...decades, maxDecade]));

  return svg;
}
