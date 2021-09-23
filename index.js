import * as d3 from "https://cdn.skypack.dev/d3@7"

const data = [...Array(50).keys()].map(x => Object({"x": x}))
const width = 400
const height = 100
const margin = ({left: 20, right: 20, top: 20, bottom: 20})

const root = d3.select("#visualization")
const svg = root.append("svg")
    .attr("viewBox", [0, 0, width, height])

const x = d3
    .scaleLinear()
    .domain(d3.extent(data, d => d["x"]))
    .range([0, width - margin.right - margin.left])
    .nice()

const c = d3
    .scaleSequential(d3.interpolateBlues)
    .domain(d3.extent(data, d => d["x"]));

svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)
    .selectAll(".row")
    .data(data)
    .join("circle")
    .attr("r", 5)
    .attr("cx", d => x(d["x"]))
    .style("fill", d => c(d["x"]))

