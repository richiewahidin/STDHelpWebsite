import * as d3 from "d3";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./Visualizations.css";

const OurVisualizations = () => {
  const [caseData, setCaseData] = useState([]);
  const d3Container = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://d1ahbxgizovdow.cloudfront.net/county"
        );
        const rows = response.data.rows;

        // Extract case data and county names from each row
        const data = rows.map((row) => ({
          county: row.name,
          cases: row.ccases,
        }));

        setCaseData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(caseData);
    if (caseData.length > 0 && d3Container.current) {
      const svg = d3.select(d3Container.current);
      svg.selectAll("*").remove(); // Clear SVG to prevent duplication

      const margin = { top: 20, right: 30, bottom: 100, left: 90 }; // increased bottom margin
      const width = 800 - margin.left - margin.right;
      const height = 500 - margin.top - margin.bottom;

      // Set the ranges
      const x = d3
        .scaleBand()
        .range([0, width])
        .padding(0.1)
        .domain(caseData.map((d) => d.county));
      const y = d3
        .scaleLinear()
        .range([height, 0])
        .domain([0, d3.max(caseData, (d) => d.cases) * 1.1]);

      // Append the svg object to the body of the page
      const graph = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const tooltip = d3
        .select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0)
        .style("position", "absolute")
        .style("padding", "10px")
        .style("background", "white")
        .style("border", "1px solid #000")
        .style("border-radius", "5px")
        .style("pointer-events", "none");

      // Create the bars
      graph
        .selectAll(".bar")
        .data(caseData)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", (d) => x(d.county))
        .attr("width", x.bandwidth())
        .attr("y", (d) => y(d.cases))
        .attr("height", (d) => height - y(d.cases))
        .on("mouseover", function (event, d) {
          tooltip.transition().duration(200).style("opacity", 0.9);
          tooltip
            .html(`County: ${d.county}<br/>Cases: ${d.cases}`)
            .style("left", event.pageX + "px")
            .style("top", event.pageY - 28 + "px");
        })
        .on("mouseout", function (d) {
          tooltip.transition().duration(500).style("opacity", 0);
        });

      // Add the X Axis
      graph
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text") // Select all the x axis labels
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");

      d3.select(d3Container.current).attr(
        "height",
        height + margin.top + margin.bottom
      );

      // Add the Y Axis
      graph.append("g").call(d3.axisLeft(y));
    }
  }, [caseData]);

  return (
    <div className="visualization-container">
      <h2 className="visualization-heading">Chlamydia cases for each California County in 2021</h2>
      <svg ref={d3Container} width={800} height={400}></svg>
    </div>
    // <div className="visualization-container">
    //   <h2 className="visualization-heading">Chlamydia cases for each California county in 2021</h2>
    //   <svg ref={d3Container} width={800} height={500 + margin.top + margin.bottom}></svg>
    // </div>
  );
};

export default OurVisualizations;
