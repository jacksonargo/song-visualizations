import * as d3 from "d3";

export function RadarChart(ref, dataSelect_1, dataSelect_2) {
  // var color = d3.scaleOrdinal().range(["#000080","#CC333F"]);
  // var color = d3.scaleOrdinal().range(["#000080","#EDC951"]);
  // var color = d3.scaleOrdinal().range(["#EDC951", "#CC333F"]);
  // var color = d3.scaleOrdinal().range(["#E74C3C", "#2980B9"]);
  // var color = d3.scaleOrdinal().range(["#E74C3C", "#138D75"]);
  // var color = d3.scaleOrdinal().range(["#2980B9", "#138D75"]);
  const color = d3.scaleOrdinal().range(["#7FB3D5", "#F1948A"]);

  //////////////////////////////////////////////////////////////
  //////////////////////// Set-Up //////////////////////////////
  //////////////////////////////////////////////////////////////

  const margin = { top: 100, right: 100, bottom: 100, left: 100 };

  //////////////////////////////////////////////////////////////
  ////////////////////////// Data //////////////////////////////
  //////////////////////////////////////////////////////////////

  const plot_order = {
    "00s": 7,
    "10s": 6,
    "90s": 5,
    "80s": 4,
    "70s": 3,
    "60s": 2,
    "50s": 1,
  };

  let dataSelect1 = dataSelect_1;
  let dataSelect2 = dataSelect_2;
  if (plot_order[dataSelect_2] > plot_order[dataSelect_1]) {
    dataSelect1 = dataSelect_2;
    dataSelect2 = dataSelect_1;
  }

  let selection1 = [];
  let selection2 = [];
  let label1 = [];
  let label2 = [];

  if (dataSelect1 === "50s") {
    selection1 = [
      [
        // 50's
        { axis: "danceability", value: 3.9211428571 },
        { axis: "energy", value: 2.4251514286 },
        { axis: "acousticness", value: 6.0927142857 },
        { axis: "liveness", value: 1.1880714286 },
        { axis: "valence", value: 3.8623571429 },
      ],
    ];
    label1 = [["50s"]];
  } else if (dataSelect1 === "60s") {
    selection1 = [
      [
        // 60's
        { axis: "danceability", value: 5.7096 },
        { axis: "energy", value: 4.74837 },
        { axis: "acousticness", value: 5.722479 },
        { axis: "liveness", value: 2.01897 },
        { axis: "valence", value: 6.3435 },
      ],
    ];
    label1 = [["60s"]];
  } else if (dataSelect1 === "70s") {
    selection1 = [
      [
        // 70's
        { axis: "danceability", value: 7.9035 },
        { axis: "energy", value: 7.3594 },
        { axis: "acousticness", value: 4.5952008 },
        { axis: "liveness", value: 2.30935 },
        { axis: "valence", value: 8.51652 },
      ],
    ];
    label1 = [["70s"]];
  } else if (dataSelect1 === "80s") {
    selection1 = [
      [
        // 80's
        { axis: "danceability", value: 8.3124 },
        { axis: "energy", value: 8.48769 },
        { axis: "acousticness", value: 2.59093 },
        { axis: "liveness", value: 2.03148 },
        { axis: "valence", value: 8.9132 },
      ],
    ];
    label1 = [["80s"]];
  } else if (dataSelect1 === "90s") {
    selection1 = [
      [
        // 90's
        { axis: "danceability", value: 9.9745 },
        { axis: "energy", value: 10.38224 },
        { axis: "acousticness", value: 4.59212334 },
        { axis: "liveness", value: 2.9846 },
        { axis: "valence", value: 9.87448 },
      ],
    ];
    label1 = [["90s"]];
  } else if (dataSelect1 === "00s") {
    selection1 = [
      [
        // 00's
        { axis: "danceability", value: 15.0468 },
        { axis: "energy", value: 16.2707 },
        { axis: "acousticness", value: 6.28143947 },
        { axis: "liveness", value: 4.45749 },
        { axis: "valence", value: 15.14682 },
      ],
    ];
    label1 = [["00s"]];
  } else if (dataSelect1 === "10s") {
    selection1 = [
      [
        // 10's
        { axis: "danceability", value: 11.26975 },
        { axis: "energy", value: 11.5775833333 },
        { axis: "acousticness", value: 4.5000248333 },
        { axis: "liveness", value: 3.0024333333 },
        { axis: "valence", value: 9.571625 },
      ],
    ];
    label1 = [["10s"]];
  }

  if (dataSelect2 === "50s") {
    selection2 = [
      [
        // 50's
        { axis: "danceability", value: 3.9211428571 },
        { axis: "energy", value: 2.4251514286 },
        { axis: "acousticness", value: 6.0927142857 },
        { axis: "liveness", value: 1.1880714286 },
        { axis: "valence", value: 3.8623571429 },
      ],
    ];
    label2 = [["50s"]];
  } else if (dataSelect2 === "60s") {
    selection2 = [
      [
        // 60's
        { axis: "danceability", value: 5.7096 },
        { axis: "energy", value: 4.74837 },
        { axis: "acousticness", value: 5.722479 },
        { axis: "liveness", value: 2.01897 },
        { axis: "valence", value: 6.3435 },
      ],
    ];
    label2 = [["60s"]];
  } else if (dataSelect2 === "70s") {
    selection2 = [
      [
        // 70's
        { axis: "danceability", value: 7.9035 },
        { axis: "energy", value: 7.3594 },
        { axis: "acousticness", value: 4.5952008 },
        { axis: "liveness", value: 2.30935 },
        { axis: "valence", value: 8.51652 },
      ],
    ];
    label2 = [["70s"]];
  } else if (dataSelect2 === "80s") {
    selection2 = [
      [
        // 80's
        { axis: "danceability", value: 8.3124 },
        { axis: "energy", value: 8.48769 },
        { axis: "acousticness", value: 2.59093 },
        { axis: "liveness", value: 2.03148 },
        { axis: "valence", value: 8.9132 },
      ],
    ];
    label2 = [["80s"]];
  } else if (dataSelect2 === "90s") {
    selection2 = [
      [
        // 90's
        { axis: "danceability", value: 9.9745 },
        { axis: "energy", value: 10.38224 },
        { axis: "acousticness", value: 4.59212334 },
        { axis: "liveness", value: 2.9846 },
        { axis: "valence", value: 9.87448 },
      ],
    ];
    label2 = [["90s"]];
  } else if (dataSelect2 === "00s") {
    selection2 = [
      [
        // 00's
        { axis: "danceability", value: 15.0468 },
        { axis: "energy", value: 16.2707 },
        { axis: "acousticness", value: 6.28143947 },
        { axis: "liveness", value: 4.45749 },
        { axis: "valence", value: 15.14682 },
      ],
    ];
    label2 = [["00s"]];
  } else if (dataSelect2 === "10s") {
    selection2 = [
      [
        // 10's
        { axis: "danceability", value: 11.26975 },
        { axis: "energy", value: 11.5775833333 },
        { axis: "acousticness", value: 4.5000248333 },
        { axis: "liveness", value: 3.0024333333 },
        { axis: "valence", value: 9.571625 },
      ],
    ];
    label2 = [["10s"]];
  }

  let data = selection1.concat(selection2);
  let labels = label1.concat(label2);

  console.log("radar chart resolved data", { data, labels });

  //////////////////////////////////////////////////////////////
  //////////////////// Draw the Chart //////////////////////////
  //////////////////////////////////////////////////////////////

  //Call function to draw the Radar chart
  return DrawRadarChart(ref, data, labels, {
    circleWidth: 600, //Width of the circle
    circleHeight: 600, //Height of the circle
    labelFactor: 1.25, //How much farther than the radius of the outer circle should the labels be placed
    wrapWidth: 60, //The number of pixels after which a label needs to be given a new line
    opacityArea: 0.35, //The opacity of the area of the blob
    dotRadius: 4, //The size of the colored circles of each blog
    opacityCircles: 0.1, //The opacity of the circles of each blob
    strokeWidth: 2, //The width of the stroke around each blob
    margin: margin,
    maxValue: 1,
    levels: 1,
    roundStrokes: true,
    color: color,
    fontFamily: "sans-serif",
    textColor: "#000000",
    backgroundColor: "#FFFFFF",
  });
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
    Format = d3.format("3"), //Percentage formatting
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

  //Set up the small tooltip for when you hover over a circle
  const tooltip = g.append("text").attr("class", "tooltip").style("opacity", 0);

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
  // .style("filter", "url(#glow)");

  //Text indicating at what % each level is
  // axisGrid
  //   .selectAll(".axisLabel")
  //   .data(d3.range(1, cfg.levels + 1).reverse())
  //   .enter()
  //   .append("text")
  //   .attr("class", "axisLabel")
  //   .attr("x", 4)
  //   .attr("y", function(d) {
  //     return (-d * radius) / cfg.levels;
  //   })
  //   .attr("dy", "0.4em")
  //   .style("font-size", "10px")
  //   //.attr("fill", "#737373")
  //   .text(function(d, i) {
  //     return Format((maxValue * d) / cfg.levels);
  //   });

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
    .on("mouseover", function (d, i) {
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
