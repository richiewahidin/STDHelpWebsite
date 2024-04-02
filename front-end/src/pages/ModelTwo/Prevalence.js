import React, { useState, useEffect } from "react";
import Card from "../../components/PrevalenceCard";
import "./Prevalence.css";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import CustomDropdown from "../../components/DropDown"; // Make sure this path is correct

const Prevalence = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [data, setData] = useState([]);
  const [countyData, setCountyData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState(""); // State to hold the selected year

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://d1ahbxgizovdow.cloudfront.net/prevalence"
        );
        setData(response.data.rows);
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
        setCountyData(response.data.rows);
      } catch (error) {
        console.error("Error fetching county data:", error);
      }
    };

    fetchCountyData();
  }, []);

  const countyMap = countyData.reduce((acc, curr) => {
    acc[curr.id] = curr.name;
    return acc;
  }, {});

  const searchData = data.filter(item => {
    const countyName = countyMap[item.countyid]?.toLowerCase();
    const year = item.year.toLowerCase();
    const sex = item.sex.toLowerCase();
    const male = "male";
    const searchWords = searchTerm.toLowerCase().split(" ");
  
    return searchWords.every(word =>
      countyName.includes(word) || year.startsWith(word) ||
      (sex.includes(word) && sex === "male") || 
      (sex.includes(word) && !male.includes(word) && sex === "female") ||
      (sex.includes(word) && sex === "total")
    ) && (selectedYear ? year === selectedYear.toLowerCase() : true);
  });

  // Find indexes of items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = searchData.slice(indexOfFirstItem, indexOfLastItem);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  // Generate years from 2001 to 2021
  const years = Array.from({ length: 21 }, (_, i) => (2001 + i).toString());

  return (
    <div className="container">
      <h1>Prevalence of STDs from 2001-2021</h1>
      <input
        type="text"
        placeholder="Search by county name, year, sex..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
      />
      <CustomDropdown title="Select Year" items={years} setter={setSelectedYear} />
      <div className="grid">
        {currentItems.map((item, index) => (
          <Card key={index} {...item} />
        ))}
      </div>
      <Pagination
        count={Math.ceil(searchData.length / itemsPerPage)}
        page={currentPage}
        onChange={handleChange}
        variant="outlined"
        shape="rounded"
        size="large"
        className="pagination"
      />
      <div style={{ padding: 15, paddingBottom: 20 }}>
        Displaying: {indexOfFirstItem + 1} -{" "}
        {Math.min(indexOfLastItem, searchData.length)} out of {searchData.length}
      </div>
    </div>
  );
};

export default Prevalence;
