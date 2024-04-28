import React, { useState, useRef, useEffect } from "react";
import * as d3 from "d3";

function App() {
  const [data] = useState([25, 50, 35, 15, 94, 10]);
  const svgRef = useRef();

  useEffect(() => {
    const w = 400;
    const h = 100;
    const svg = d3
      .select(svgRef.current)
      .attr("width", w)
      .attr("height", h)
      .style("background", "#d3d3d3")
      .style("margin-top", "50")
      .style("overflow", "visible");

    const xScale = d3
      .scaleLinear()
      .domain([0, data.length - 1])
      .range([0, w]);
    const yScale = d3.scaleLinear().domain([0, d3.max(data)]).range([h, 0]);
    const generateScaledLine = d3
      .line()
      .x((d, i) => xScale(i))
      .y((d) => yScale(d))
      .curve(d3.curveCardinal);

    const xAxis = d3
      .axisBottom()
      .scale(xScale)
      .ticks(data.length)
      .tickFormat((i) => i + 1);
    const yAxis = d3.axisLeft().scale(yScale).ticks(5);
    svg.append("g").call(xAxis).attr("transform", `translate(0, ${h})`);
    svg.append("g").call(yAxis);

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("d", generateScaledLine);
  }, [data]);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default App;