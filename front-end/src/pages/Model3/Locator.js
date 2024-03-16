import React, { useState, useEffect } from "react";
import LocatorCard from "../../components/LocatorCard";
import LocatorData from "./LocatorData.json";
import Pagination from "@mui/material/Pagination";
import axios from "axios";

const Locator = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://d1ahbxgizovdow.cloudfront.net/treatmentcenter"
        );
        setData(response.data.rows); // Update state with fetched data rows
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Find indexes of items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  // Only display 10 items per page.
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="container">
      <h1>Locator</h1>
      <div className="grid">
        {currentItems.map((item, index) => (
          <LocatorCard key={index} {...item} />
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

export default Locator;
