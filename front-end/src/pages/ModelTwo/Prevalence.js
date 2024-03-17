import React, { useState, useEffect } from "react";
import PrevalenceCard from "../../components/PrevalenceCard";
import "./Prevalence.css";
import Pagination from "@mui/material/Pagination";
import axios from "axios";

const Prevalence = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [data, setData] = useState([]); // Initialize data state as an empty array

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://d1ahbxgizovdow.cloudfront.net/prevalence",
        );
        setData(response.data.rows); // Update state with fetched data rows
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Find indexes of items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Only display 10 items per page based on fetched data
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="container">
      <h1>Prevalence of STDs from 2003-2021</h1>
      <div className="grid">
        {currentItems.map((item, index) => (
          <PrevalenceCard key={index} {...item} />
        ))}
      </div>
      <Pagination
        count={Math.ceil(data.length / itemsPerPage)}
        page={currentPage}
        onChange={handleChange}
        variant="outlined"
        shape="rounded"
        size="large"
        className="pagination"
      />
      <div style={{ padding: 15, paddingBottom: 20 }}>
        Displaying: {indexOfFirstItem + 1} -{" "}
        {Math.min(indexOfLastItem, data.length)} out of {data.length}
      </div>
    </div>
  );
};

export default Prevalence;
