import React, { useState, useEffect } from "react";
import Card from "../../components/PrevalenceCard";
import "./Prevalence.css";
import Pagination from "@mui/material/Pagination";
import axios from "axios";

const Prevalence = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [data, setData] = useState([]);
  const [countyData, setCountyData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://d1ahbxgizovdow.cloudfront.net/prevalence"
        );
        setData(response.data.rows); // Update state with fetched data rows
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchCountyData = async () => {
      try {
        const response = await axios.get(
          "https://d1ahbxgizovdow.cloudfront.net/county"
        );
        setCountyData(response.data.rows); // Update state with fetched county data
      } catch (error) {
        console.error("Error fetching county data:", error);
      }
    };

    fetchCountyData();
  }, []);

  // Create a mapping between countyid and countyname
  const countyMap = countyData.reduce((acc, curr) => {
    acc[curr.id] = curr.name;
    return acc;
  }, {});

  // Find indexes of items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredData = data.filter((item) => {
    const countyName = countyMap[item.countyid]?.toLowerCase();
    const year = item.year.toLowerCase();
    const sex = item.sex.toLowerCase();
    const male = "male";

    // Split search term into words
    const searchWords = searchTerm.toLowerCase().split(" ");

    // Check if each word is included in county name, year, or sex
    return searchWords.every(
      (word) =>
        countyName.includes(word) ||
        year.startsWith(word) ||
        (sex.includes(word) && sex === "male") ||
        (sex.includes(word) && !male.includes(word) && sex === "female") ||
        (sex.includes(word) && sex === "total")
    );
  });

  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset current page to 1 when search term changes
  };

  return (
    <div className="container">
      <h1>Prevalence of STDs from 2003-2021</h1>
      <input
        type="text"
        placeholder="Search by county name, year, sex..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
      />
      <div className="grid">
        {currentItems.map((item, index) => (
          <Card key={index} {...item} />
        ))}
      </div>
      <Pagination
        count={Math.ceil(filteredData.length / itemsPerPage)}
        page={currentPage}
        onChange={handleChange}
        variant="outlined"
        shape="rounded"
        size="large"
        className="pagination"
      />
      <div style={{ padding: 15, paddingBottom: 20 }}>
        Displaying: {indexOfFirstItem + 1} -{" "}
        {Math.min(indexOfLastItem, filteredData.length)} out of{" "}
        {filteredData.length}
      </div>
    </div>
  );
};

export default Prevalence;
