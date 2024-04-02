import React, { useState, useEffect } from "react";
import LocatorCard from "../../components/LocatorCard";
import Pagination from "@mui/material/Pagination";
import axios from "axios";

const Locator = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://d1ahbxgizovdow.cloudfront.net/treatmentcenter"
        );
        setData(response.data.rows); // Update state with fetched data rows
        console.log("Locator data:", response.data.rows);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredData = data.filter(item => {
    const name = item.name.toLowerCase();
    const address = item.address.toLowerCase();

    // Split search term into words
    const searchWords = searchTerm.toLowerCase().split(" ");

    // Check if either name or address includes any of the search words
    return searchWords.every(word => name.includes(word) || address.includes(word));
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
      <h1>Locator</h1>
      <input
        type="text"
        placeholder="Search by name, address, or zip code..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
      />
      <div className="grid">
        {currentItems.map((item, index) => (
          <LocatorCard key={index} {...item} />
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
        {Math.min(indexOfLastItem, filteredData.length)} out of {filteredData.length}
      </div>
    </div>
  );
};

export default Locator;
