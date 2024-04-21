import * as d3 from "d3";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { sum } from "d3-array";
import "./Visualizations.css";

const OurVisualizations = () => {
  const [caseData, setCaseData] = useState([]);
  const [treemapData, setTreemapData] = useState([]);
  const [donutData, setDonutData] = useState([]);
  const d3BarChartContainer = useRef(null);
  const d3TreemapContainer = useRef(null);
  const d3DonutChartContainer = useRef(null);

  useEffect(() => {
    const fetchBarChartData = async () => {
      try {
        const response = await axios.get(
          "https://d1ahbxgizovdow.cloudfront.net/county"
        );
        const data = response.data.rows.map((row) => ({
          county: row.name,
          cases: parseInt(row.ccases),
        }));
        setCaseData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchTreemapData = async () => {
      try {
        const response = await axios.get(
          "https://d1ahbxgizovdow.cloudfront.net/prevalence"
        );
        const aggregatedData = response.data.rows.reduce((acc, row) => {
          if (row.sex === "Total") {
            const year = row.year;
            const cases = parseInt(row.c_cases);
            if (!acc[year]) {
              acc[year] = { year, cases: 0 };
            }
            acc[year].cases += cases;
          }
          return acc;
        }, {});

        setTreemapData(Object.values(aggregatedData));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchDonutData = async () => {
      try {
        const response = await axios.get(
          "https://d1ahbxgizovdow.cloudfront.net/prevalence"
        );
        const filteredData = response.data.rows.filter(row => row.year === "2021" && row.sex === "Total");
        const totalCases = filteredData.reduce((acc, row) => {
          acc.c_cases += parseInt(row.c_cases, 10);
          acc.g_cases += parseInt(row.g_cases, 10);
          acc.s_cases += parseInt(row.s_cases, 10);
          return acc;
        }, { c_cases: 0, g_cases: 0, s_cases: 0 });
        setDonutData([totalCases]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBarChartData();
    fetchTreemapData();
    fetchDonutData();
  }, []);

  useEffect(() => {
    if (caseData.length > 0 && d3BarChartContainer.current) {
      const svg = d3.select(d3BarChartContainer.current);
      svg.selectAll("*").remove(); // Clear SVG to prevent duplication

      const margin = { top: 20, right: 30, bottom: 100, left: 90 };
      const width = 800 - margin.left - margin.right;
      const height = 500 - margin.top - margin.bottom;

      const x = d3
        .scaleBand()
        .range([0, width])
        .padding(0.1)
        .domain(caseData.map((d) => d.county));
      const y = d3
        .scaleLinear()
        .range([height, 0])
        .domain([0, d3.max(caseData, (d) => d.cases) * 1.1]);

      const graph = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // Create a tooltip
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
            .style("left", `${event.pageX}px`)
            .style("top", `${event.pageY - 28}px`);
        })
        .on("mouseout", function () {
          tooltip.transition().duration(500).style("opacity", 0);
        });

      graph
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");

      graph.append("g").call(d3.axisLeft(y));

      d3.select(d3BarChartContainer.current).attr(
        "height",
        height + margin.top + margin.bottom
      );
    }
  }, [caseData]);

  // Code to create the second visualization: A treemap where each square represents a year and the total number of
  // Chlamydia cases for that year from all counties.
  useEffect(() => {
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

    if (treemapData.length > 0 && d3TreemapContainer.current) {
      const svg = d3.select(d3TreemapContainer.current);
      svg.selectAll("*").remove();

      const width = 1000;
      const height = 400;

      const color = d3.scaleSequential(
        [0, d3.max(treemapData, (d) => d.cases)],
        d3.interpolateInferno
      );

      const root = d3.hierarchy({ children: treemapData }).sum((d) => d.cases);

      const treemap = d3.treemap().size([width, height]).padding(1);

      treemap(root);

      const leaf = svg
        .selectAll("g")
        .data(root.leaves())
        .enter()
        .append("g")
        .attr("transform", (d) => `translate(${d.x0},${d.y0})`);

      leaf
        .append("rect")
        .attr("fill", (d) => color(d.value))
        .attr("width", (d) => d.x1 - d.x0)
        .attr("height", (d) => d.y1 - d.y0)
        .on("mouseover", function (event, d) {
          tooltip.transition().duration(200).style("opacity", 0.9);
          tooltip
            .html(`Year: ${d.data.year}<br/>Cases: ${d.value}`)
            .style("left", `${event.pageX + 10}px`)
            .style("top", `${event.pageY - 28}px`);
        })
        .on("mouseout", function () {
          tooltip.transition().duration(500).style("opacity", 0);
        });

      leaf
        .append("text")
        .attr("x", 5)
        .attr("y", 20)
        .text((d) => `Year ${d.data.year}: ${d.value} cases`)
        .attr("font-size", "10px")
        .attr("fill", "black");

      d3.select(d3TreemapContainer.current)
        .attr("width", width)
        .attr("height", height);
    }
  }, [treemapData]);

  useEffect(() => {
    if (donutData.length > 0 && d3DonutChartContainer.current) {
      const svg = d3.select(d3DonutChartContainer.current);
      svg.selectAll("*").remove(); // Clear existing SVG content

      const width = 400, height = 400, radius = Math.min(width, height) / 2;

      const color = d3.scaleOrdinal(["#ff6347", "#6a5acd", "#20b2aa"]);

      const arc = d3.arc()
        .innerRadius(radius * 0.5)
        .outerRadius(radius - 10);

      const pie = d3.pie()
        .sort(null)
        .value(d => d.cases);  // Correctly access the cases property

        const caseTypeNames = {
          c_cases: 'Chlamydia',
          g_cases: 'Gonorrhea',
          s_cases: 'Syphilis'
        };
        
        const caseTypes = Object.entries(donutData[0]).map(([type, cases]) => ({
          type: caseTypeNames[type] || type, // This will translate 'g_cases' to 'Gonorrhea', etc.
          cases
        }));

      const arcs = svg.append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`)
        .selectAll(".arc")
        .data(pie(caseTypes))
        .enter().append("g")
        .attr("class", "arc");

      arcs.append("path")
        .attr("d", arc)
        .attr("fill", (d, i) => color(i));

      arcs.append("text")
        .attr("transform", d => `translate(${arc.centroid(d)})`)
        .attr("dy", "0.35em")
        .text(d => `${d.data.type}: ${d.data.cases}`);

      d3.select(d3DonutChartContainer.current)
        .attr("width", 485)
        .attr("height", height);
    }
  }, [donutData]);


  return (
    <div className="visualization-container">
      <h2 className="visualization-heading">
        Chlamydia cases for each California County in 2021
      </h2>
      <svg ref={d3BarChartContainer} width={800} height={600}></svg>
      <h2 className="visualization-heading">
        Total Chlamydia cases by year across all counties
      </h2>
      <svg ref={d3TreemapContainer} width={800} height={400}></svg>
      <h2 style={{margin: "10px"}}className="visualization-heading">Case Comparison by Case Type for 2021</h2>
      <svg ref={d3DonutChartContainer} width={400} height={400}></svg>
    </div>
  );
};

export default OurVisualizations;
