import React, { useState, useEffect } from "react";
import LocatorCard from "../../components/LocatorCard";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import CustomDropdown from "../../components/DropDown";

const Locator = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [data, setData] = useState([]);
  const [countyData, setCountyData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCounty, setSelectedCounty] = useState("");
  const [selectedDistance, setSelectedDistance] = useState("");
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://d1ahbxgizovdow.cloudfront.net/treatmentcenter"
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredData = data.filter((item) => {
    const countyName = countyMap[item.countyId]?.toLowerCase();
    const name = item.name.toLowerCase();
    const address = item.address.toLowerCase();
    const distance = item.distance;

    // Split search term into words
    const searchWords = searchTerm.toLowerCase().split(" ");

    const matchesSearchTerm = searchWords.every(
      (word) => name.includes(word) || address.includes(word)
    );

    // Check if either name or address includes any of the search words
    const matchesCounty =
      (selectedCounty && selectedCounty !== "All Counties"
        ? countyName === selectedCounty.toLowerCase()
        : true) &&
      (selectedDistance === "Over 5"
        ? distance > 5
        : selectedDistance === "Under 5"
        ? distance <= 5
        : true);
    return matchesSearchTerm && matchesCounty;
  });

  if (sortOption === "A to Z") {
    filteredData.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === "Z to A") {
    filteredData.sort((a, b) => b.name.localeCompare(a.name));
  }
  const sortOptions = ["All", "A to Z", "Z to A"];
  // Get all county names for dropdown
  const countyNames = [
    "All Counties",
    ...countyData.map((county) => county.name).sort(),
  ];
  const distanceOptions = ["All", "Over 5", "Under 5"];

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
      <div style={{ padding: 10 }}>
        <CustomDropdown
          title="Select County"
          items={countyNames}
          setter={setSelectedCounty}
        />
        <CustomDropdown
          title="Select Distance"
          items={distanceOptions}
          setter={setSelectedDistance}
        />
        <CustomDropdown
          title="Sort Data"
          items={sortOptions}
          setter={setSortOption}
        />
      </div>
      <div className="grid">
        {currentItems.map((item, index) => (
          <LocatorCard key={index} {...item} searchTerm={searchTerm}/>
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

export default Locator;
