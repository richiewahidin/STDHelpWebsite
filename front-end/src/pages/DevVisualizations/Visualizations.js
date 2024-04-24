import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import * as d3 from "d3";
import "./Visualizations.css"

const monthMap = {
  "January": "01",
  "February": "02",
  "March": "03",
  "April": "04",
  "May": "05",
  "June": "06",
  "July": "07",
  "August": "08",
  "September": "09",
  "October": "10",
  "November": "11",
  "December": "12"
};

const monthNameMap = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    "10": "October",
    "11": "November",
    "12": "December"
};

function useFetchAll(urls, params) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all(urls.map(url => axios.get(url, { params })));
        const responseData = responses.map(response => response.data);
        setData(responseData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [urls, params]);

  return { data, loading, error };
}

function DeveloperVisualizations() {
  const { data: [sheltersData, eventsData, countiesData], loading, error } = useFetchAll([
    "https://api.texashomesproject.me/shelters/",
    "https://api.texashomesproject.me/events/",
    "https://api.texashomesproject.me/counties/"
  ], {});

  const sheltersSvgRef = useRef();
  const eventsSvgRef = useRef();
  const countiesSvgRef = useRef();

  useEffect(() => {
    if (!sheltersData || !sheltersData.length) return;

    const sheltersByCity = sheltersData.reduce((acc, shelter) => {
      const city = shelter.city;
      if (!acc[city]) {
        acc[city] = 1;
      } else {
        acc[city] += 1;
      }
      return acc;
    }, {});

    const cityNames = Object.keys(sheltersByCity);
    const shelterCounts = Object.values(sheltersByCity);

    const margin = { top: 20, right: 30, bottom: 60, left: 100 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(sheltersSvgRef.current);

    const x = d3
      .scaleBand()
      .domain(cityNames)
      .range([margin.left, width - margin.right])
      .padding(0.2);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(shelterCounts)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const tooltip = d3
      .select(sheltersSvgRef.current.parentElement)
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0)
      .style("position", "absolute")
      .style("padding", "10px")
      .style("background", "white")
      .style("border", "1px solid #000")
      .style("border-radius", "5px")
      .style("pointer-events", "none");

    svg
      .selectAll(".bar")
      .data(shelterCounts)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d, i) => x(cityNames[i]))
      .attr("y", (d) => y(d))
      .attr("index", (d, i) => i)
      .attr("height", (d) => y(0) - y(d))
      .attr("width", x.bandwidth())
      .on("mouseover", function (event, d) {
          const index = d3.select(this).attr("index");
          const city = cityNames[index];
          tooltip.transition().duration(200).style("opacity", 0.9);
          tooltip
            .html(`City: ${city}<br/>Shelters: ${d}`)
            .style("left", event.pageX + "px")
            .style("top", event.pageY - 28 + "px");
      })
      .on("mouseout", function () {
        tooltip.transition().duration(500).style("opacity", 0);
      });

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("y", 0)
      .attr("x", 9)
      .attr("dy", ".35em")
      .attr("transform", "rotate(45)")
      .style("text-anchor", "start");

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))
      .selectAll("text")
      .attr("class", "axis");

    svg.attr("viewBox", [0, 0, width + margin.left + margin.right, height]);
  }, [sheltersData]);

  useEffect(() => {
    if (!eventsData || !eventsData.length) return;

    const eventsByMonth = eventsData.reduce((acc, event) => {
      var [year, month, date] = event['date_posted'].split('-');
      if (year.includes(',')) {
        var monthDate;
        [monthDate, year] = year.split(", ");
        [month, date] = monthDate.split(" ");
        month = monthMap[month];
      }
      const monthYear = `${monthNameMap[month]} ${year}`;
      if (!acc[monthYear]) {
        acc[monthYear] = 1;
      } else {
        acc[monthYear] += 1;
      }
      return acc;
    }, {});

    const months = Object.keys(eventsByMonth).sort((a, b) => {
      const [aMonth, aYear] = a.split(' ');
      const [bMonth, bYear] = b.split(' ');
      return new Date(`${aMonth} 1, ${aYear}`) - new Date(`${bMonth} 1, ${bYear}`);
    });

    const eventCounts = months.map(month => eventsByMonth[month]);

    const margin = { top: 20, right: 30, bottom: 100, left: 100 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(eventsSvgRef.current);

    const x = d3.scaleBand()
      .domain(months)
      .range([margin.left, width - margin.right])
      .padding(0.2);

    const y = d3.scaleLinear()
      .domain([0, d3.max(eventCounts)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const tooltip = d3
      .select(eventsSvgRef.current.parentElement)
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0)
      .style("position", "absolute")
      .style("padding", "10px")
      .style("background", "white")
      .style("border", "1px solid #000")
      .style("border-radius", "5px")
      .style("pointer-events", "none");

    const line = d3.line()
      .x((d, i) => x(months[i]) + x.bandwidth() / 2)
      .y((d) => y(d))
      .curve(d3.curveMonotoneX);

    svg.selectAll("g").remove();

    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)");

    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    svg.append("path")
      .datum(eventCounts)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("d", line);

    svg.selectAll(".dot")
      .data(eventCounts)
      .enter().append("circle")
      .attr("class", "dot")
      .attr("cx", (d, i) => x(months[i]) + x.bandwidth() / 2)
      .attr("cy", (d) => y(d))
      .attr("r", 4)
      .attr("fill", "steelblue")
      .attr("index", (d, i) => i)
      .on("mouseover", function (event, d) {
        const index = d3.select(this).attr("index");
        tooltip.transition().duration(200).style("opacity", 0.9);
        tooltip
          .html(`Number of Events in ${months[index]}: ${d}`)
          .style("left", event.pageX + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mouseout", function () {
        tooltip.transition().duration(500).style("opacity", 0);
      });

    svg.attr("viewBox", [0, 0, width + margin.left + margin.right, height]);
  }, [eventsData]);


  useEffect(() => {
    if (!countiesData || !countiesData.length) return;
  
    const margin = { top: 50, right: 50, bottom: 100, left: 100 };
    const width = 1000 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;
  
    const svg = d3.select(countiesSvgRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
  
    const x = d3.scaleLinear()
      .domain([0, d3.max(countiesData, d => d.population) + 5000]) // Add some padding for better visualization
      .range([0, width]);
  
    const y = d3.scaleLinear()
      .domain([0, d3.max(countiesData, d => d.housing_units) + 5000]) // Add some padding for better visualization
      .range([height, 0]);

    const tooltip = d3
      .select(countiesSvgRef.current.parentElement)
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0)
      .style("position", "absolute")
      .style("padding", "10px")
      .style("background", "white")
      .style("border", "1px solid #000")
      .style("border-radius", "5px")
      .style("pointer-events", "none");

    svg.selectAll("circle")
      .data(countiesData)
      .enter()
      .append("circle")
      .attr("cx", d => x(d.population))
      .attr("cy", d => y(d.housing_units))
      .attr("r", 5)
      .style("fill", "steelblue")
      .on("mouseover", function (event, d) {
        tooltip.transition().duration(200).style("opacity", 0.9);
        tooltip
          .html(`${d.name}<br/>Population: ${d.population}<br/>Housing Units: ${d.housing_units}`)
          .style("left", event.pageX + "px")
          .style("top", event.pageY - 28 + "px");
    })
    .on("mouseout", function () {
      tooltip.transition().duration(500).style("opacity", 0);
    });

    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .append("text")
      .attr("x", width / 2)
      .attr("y", margin.bottom - 10)
      .attr("text-anchor", "middle")
      .text("Population");

    svg.append("g")
      .call(d3.axisLeft(y))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 10)
      .attr("x", 0 - height / 2)
      .attr("dy", "1em")
      .attr("text-anchor", "middle")
      .text("Housing Units");

    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height + margin.top + 10) // Position below the x-axis
      .attr("text-anchor", "middle")
      .text("Population");

    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - height / 2)
      .attr("dy", "1em")
      .attr("text-anchor", "middle")
      .text("Housing Units");

  }, [countiesData]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!countiesData) return <div>No data available</div>;

  return (
    <div>
      <div className="visualization-container">
        <h2>Number of Available Shelters per City in Texas</h2>
        <svg ref={sheltersSvgRef}></svg>
      </div>
      <div className="visualization-container">
        <h2>Number of Events per Month</h2>
        <svg ref={eventsSvgRef}></svg>
      </div>
      <div className="visualization-container">
      <h2>Housing Units vs Population per County</h2>
  <div style={{ width: "100%", maxWidth: "1000px" }}>
    <svg ref={countiesSvgRef} viewBox={`0 0 ${1000} ${600}`}></svg>
  </div>
</div>
    </div>
  );
}

export default DeveloperVisualizations;
