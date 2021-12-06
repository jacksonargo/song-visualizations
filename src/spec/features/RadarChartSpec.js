import * as d3 from "d3";
import { FeatureRadarRollup } from "./FeatureRadarRollup";

export function RadarChart(ref, chartStyle, wantDecades) {
  const wantRollup = {};
  wantDecades.map((d) => (wantRollup[d] = FeatureRadarRollup[d]));
  const data = Object.values(wantRollup).map((r) => r);
  const labels = Object.keys(wantRollup).map((r) => [r.toString()]);
  return DrawRadarChart(ref, data, labels, chartStyle);
}

function DrawRadarChart(ref, data, labels, chartStyle) {
  /////////////////////////////////////////////////////////
  /////////////////// Helper Function /////////////////////
  /////////////////////////////////////////////////////////

  //Taken from http://bl.ocks.org/mbostock/7555321

  //Wraps SVG text
  function wrap(text, width) {
    text.each(function () {
      let text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.4, // ems
        y = text.attr("y"),
        x = text.attr("x"),
        dy = parseFloat(text.attr("dy")),
        tspan = text
          .text(null)
          .append("tspan")
          .attr("x", x)
          .attr("y", y)
          .attr("dy", dy + "em");

      while ((word = words.pop())) {
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().textContent.length > width) {
          line.pop();
          tspan.text(line.join(" "));
          line = [word];
          tspan = text
            .append("tspan")
            .attr("x", x)
            .attr("y", y)
            .attr("dy", ++lineNumber * lineHeight + dy + "em")
            .text(word);
        }
      }
    });
  } //wrap

  //If the supplied maxValue is smaller than the actual one, replace by the max in the data
  const maxValue = Math.max(
    chartStyle.maxValue,
    d3.max(data, function (i) {
      return d3.max(
        i.map(function (o) {
          return o.value;
        })
      );
    })
  );

  const allAxis = data[0].map(function (i, j) {
      return i.axis;
    }), //Names of each axis
    total = allAxis.length, //The number of different axes
    radius = Math.min(chartStyle.circleWidth / 2, chartStyle.circleHeight / 2), //Radius of the outermost circle
    Format = d3.format(".3"), //Percentage formatting
    angleSlice = (Math.PI * 2) / total; //The width in radians of each "slice"

  //Scale for the radius
  const rScale = d3.scaleLinear().range([0, radius]).domain([0, maxValue]);

  /////////////////////////////////////////////////////////
  //////////// Create the container SVG and g /////////////
  /////////////////////////////////////////////////////////

  //Calculate width and height
  const height =
    chartStyle.circleHeight + chartStyle.margin.top + chartStyle.margin.bottom;
  const width =
    chartStyle.circleWidth + chartStyle.margin.left + chartStyle.margin.right;

  //Initiate the radar chart SVG
  const div = d3.select(ref.current);

  const svg = div
    .append("svg")
    .attr("viewBox", `0 0 ${chartStyle.width} ${chartStyle.height}`)
    .attr("class", +new Date())
    .style("background", chartStyle.backgroundColor)
    .style("font", chartStyle.fontFamily)
    .style("fill", chartStyle.textColor);

  //Append a g element
  const g = svg
    .append("g")
    .attr(
      "transform",
      "translate(" +
        (chartStyle.circleWidth / 2 + chartStyle.margin.left) +
        "," +
        (chartStyle.circleHeight / 2 + chartStyle.margin.top) +
        ")"
    );

  /////////////////////////////////////////////////////////
  ////////// Glow filter for some extra pizzazz ///////////
  /////////////////////////////////////////////////////////

  //Filter for the outside glow
  const filter = g.append("defs").append("filter").attr("id", "glow"),
    feGaussianBlur = filter
      .append("feGaussianBlur")
      .attr("stdDeviation", "2.5")
      .attr("result", "coloredBlur"),
    feMerge = filter.append("feMerge"),
    feMergeNode_1 = feMerge.append("feMergeNode").attr("in", "coloredBlur"),
    feMergeNode_2 = feMerge.append("feMergeNode").attr("in", "SourceGraphic");

  /////////////////////////////////////////////////////////
  /////////////// Draw the Circular grid //////////////////
  /////////////////////////////////////////////////////////

  //Wrapper for the grid & axes
  const axisGrid = g.append("g").attr("class", "axisWrapper");

  //Draw the background circles
  axisGrid
    .selectAll(".levels")
    .data(d3.range(1, chartStyle.levels + 1).reverse())
    .enter()
    .append("circle")
    .attr("class", "gridCircle")
    .attr("r", function (d, i) {
      return (radius / chartStyle.levels) * d;
    })
    .style("fill", "#CDCDCD")
    .style("stroke", "#CDCDCD")
    .style("fill-opacity", chartStyle.opacityCircles);

  /////////////////////////////////////////////////////////
  //////////////////// Draw the axes //////////////////////
  /////////////////////////////////////////////////////////

  //Create the straight lines radiating outward from the center
  const axis = axisGrid
    .selectAll(".axis")
    .data(allAxis)
    .enter()
    .append("g")
    .attr("class", "axis");

  //Append the lines
  axis
    .append("line")
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", function (d, i) {
      return rScale(maxValue * 1.1) * Math.cos(angleSlice * i - Math.PI / 2);
    })
    .attr("y2", function (d, i) {
      return rScale(maxValue * 1.1) * Math.sin(angleSlice * i - Math.PI / 2);
    })
    .attr("class", "line")
    .style("stroke", "white")
    .style("stroke-width", "2px");

  //Append the labels at each axis
  axis
    .append("text")
    .attr("class", "legend")
    .style("font-size", "11px")
    .attr("text-anchor", "middle")
    .attr("dy", "0.35em")
    .attr("x", function (d, i) {
      return (
        rScale(maxValue * chartStyle.labelFactor) *
        Math.cos(angleSlice * i - Math.PI / 2)
      );
    })
    .attr("y", function (d, i) {
      return (
        rScale(maxValue * chartStyle.labelFactor) *
        Math.sin(angleSlice * i - Math.PI / 2)
      );
    })
    .text(function (d) {
      return d;
    })
    .call(wrap, chartStyle.wrapWidth);

  /////////////////////////////////////////////////////////
  ///////////// Draw the radar chart blobs ////////////////
  /////////////////////////////////////////////////////////

  //The radial line function
  const radarLine = d3
    .lineRadial()
    .curve(d3.curveBasisClosed)
    .radius(function (d) {
      return rScale(d.value);
    })
    .angle(function (d, i) {
      return i * angleSlice;
    });

  if (chartStyle.roundStrokes) {
    radarLine.curve(d3.curveCardinalClosed);
  }

  //Create a wrapper for the blobs
  const blobWrapper = g
    .selectAll(".radarWrapper")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "radarWrapper");

  //Append the backgrounds
  blobWrapper
    .append("path")
    .attr("class", "radarArea")
    .attr("d", function (d, i) {
      return radarLine(d);
    })
    .style("fill", function (d, i) {
      return chartStyle.color(i);
    })
    .style("fill-opacity", chartStyle.opacityArea)
    .on("mouseover", function (d, i) {
      //Dim all blobs
      d3.selectAll(".radarArea")
        .transition()
        .duration(200)
        .style("fill-opacity", 0.1);
      //Bring back the hovered over blob
      d3.select(this).transition().duration(200).style("fill-opacity", 0.7);
    })
    .on("mouseout", function () {
      //Bring back all blobs
      d3.selectAll(".radarArea")
        .transition()
        .duration(200)
        .style("fill-opacity", chartStyle.opacityArea);
    });

  //Create the outlines
  blobWrapper
    .append("path")
    .attr("class", "radarStroke")
    .attr("d", function (d, i) {
      return radarLine(d);
    })
    .style("stroke-width", chartStyle.strokeWidth + "px")
    .style("stroke", function (d, i) {
      return chartStyle.color(i);
    })
    .style("fill", "none")
    .style("filter", "url(#glow)");

  //Append the circles
  blobWrapper
    .selectAll(".radarCircle")
    .data(function (d, i) {
      return d;
    })
    .enter()
    .append("circle")
    .attr("class", "radarCircle")
    .attr("r", chartStyle.dotRadius)
    .attr("cx", function (d, i) {
      return rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2);
    })
    .attr("cy", function (d, i) {
      return rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2);
    })
    .style("fill", function (d) {
      return "#737373";
    })
    .style("fill-opacity", 0.8);

  /////////////////////////////////////////////////////////
  //////// Append invisible circles for tooltip ///////////
  /////////////////////////////////////////////////////////

  //Wrapper for the invisible circles on top
  const blobCircleWrapper = g
    .selectAll(".radarCircleWrapper")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "radarCircleWrapper");

  //Set up the small tooltip for when you hover over a circle
  const tooltip = g.append("text").attr("class", "tooltip").style("opacity", 0);

  //Append a set of invisible circles on top for the mouseover pop-up
  blobCircleWrapper
    .selectAll(".radarInvisibleCircle")
    .data(function (d, i) {
      return d;
    })
    .enter()
    .append("circle")
    .attr("class", "radarInvisibleCircle")
    .attr("r", chartStyle.dotRadius * 1.5)
    .attr("cx", function (d, i) {
      return rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2);
    })
    .attr("cy", function (d, i) {
      return rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2);
    })
    .style("fill", "none")
    .style("pointer-events", "all")
    .on("mouseover", function (e, d) {
      var newX = parseFloat(d3.select(this).attr("cx")) - 10;
      var newY = parseFloat(d3.select(this).attr("cy")) - 10;

      tooltip
        .attr("x", newX)
        .attr("y", newY)
        .text(Format(d.value))
        .transition()
        .duration(200)
        .style("opacity", 1);
    })
    .on("mouseout", function () {
      tooltip.transition().duration(200).style("opacity", 0);
    });

  //legend
  const maxword = d3.max(labels, (d) => d.length);
  const r = width / 110;
  const x = width / 2 - 8 * r - 4 * maxword;
  const y = -height / 2 + 4 * r; //cfg.h / 2 + 100;
  const legend = g
    .selectAll("mydots")
    .data(labels)
    .enter()
    .append("circle")
    .attr("cx", x)
    .attr("cy", function (d, i) {
      return y + i * 25;
    }) // 100 is where the first dot appears. 25 is the distance between dots
    .attr("r", r)
    .style("fill", (d, i) => chartStyle.color(i))
    .style("filter", "url(#glow)");

  g.selectAll("mydots")
    .data(labels)
    .enter()
    .append("text")
    .attr("x", x + 15)
    .attr("y", function (d, i) {
      return y + i * 25;
    }) // 100 is where the first dot appears. 25 is the distance between dots
    .style("fill", chartStyle.textColor)
    .style("font-size", "11px")
    .text((d) => d)
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle");

  return svg;
} //RadarChart
