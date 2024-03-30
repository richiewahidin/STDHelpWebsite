import React, { useState, useEffect } from "react";
import PrevalenceCard from "../../components/PrevalenceCard";
import "./Prevalence.css";
import CustomDropdown from "../../components/DropDown";
import Pagination from "@mui/material/Pagination";
import axios from "axios";

const Prevalence = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [year, setYear] = useState("");

  const allYears = [
    "All",
    2001,
    2002,
    2003,
    2004,
    2005,
    2006,
    2007,
    2008,
    2009,
    2010,
    2011,
    2012,
    2013,
    2014,
    2015,
    2016,
    2017,
    2018,
    2019,
    2020,
    2021,
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://d1ahbxgizovdow.cloudfront.net/prevalence"
        );
        setYear("All");
        setData(response.data.rows); // Update state with fetched data rows
        setFilteredData(response.data.rows);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter the data based on the selected year
    const filtered =
      year === "All"
        ? data
        : data.filter((item) => String(item.year) === String(year));
    setFilteredData(filtered);
  }, [year, data]);

  // Find indexes of items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Only display 10 items per page based on fetched data
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="container">
      <h1>Prevalence of STDs from 2003-2021</h1>
      <div className="dropdownContainer">
        <CustomDropdown
          title="Years"
          items={allYears}
          setter={setYear}
        ></CustomDropdown>
      </div>
      <div className="grid">
        {currentItems.map((item, index) => (
          <PrevalenceCard key={index} {...item} />
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
        {Math.min(indexOfLastItem, data.length)} out of {filteredData.length}
      </div>
    </div>
  );
};

export default Prevalence;
