import { Col, Row, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import "./Counties.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import CountiesCard from "./CountiesCard";
import CustomDropdown from "../../components/DropDown";

const Counties = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [data, setData] = useState([]); // Initialize data state as an empty array
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [selectedCounty, setSelectedCounty] = useState("");
  const [selectedPopulation, setSelectedPopulation] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [selectedChlamydia, setSelectedChlamydia] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://d1ahbxgizovdow.cloudfront.net/county"
        );
        setData(response.data.rows); // Update state with fetched data rows
        setSortOption("AtoZ");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredData = data.filter((item) => {
    // Check if item name includes the search term
    const countyName = item.name.toLowerCase();
    const nameMatches = countyName.includes(searchTerm.toLowerCase());
    // Check if population is greater than the search term
    const populationMatches =
      parseInt(item.population.replace(/,/g, "")) > parseInt(searchTerm);
    const population = parseInt(item.population.replace(/,/g, ""));
    const chlamydia = parseInt(item.ccases.replace(/,/g, ""));

    // Return true if the item name matches or if the population is greater than the search term
    return (
      (nameMatches || populationMatches) &&
      (selectedCounty && selectedCounty !== "All Counties"
        ? countyName === selectedCounty.toLowerCase()
        : true) &&
      (selectedPopulation === "Over 100,000"
        ? population > 100000
        : selectedPopulation === "Under 100,000"
        ? population <= 100000
        : true) &&
      (selectedChlamydia === "Over 100"
        ? chlamydia > 100
        : selectedChlamydia === "Under 100"
        ? chlamydia <= 100
        : true)
    );
  });

  if (sortOption === "A to Z") {
    filteredData.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === "Z to A") {
    filteredData.sort((a, b) => b.name.localeCompare(a.name));
  }

  // Get all county names for dropdown
  const countyNames = [
    "All Counties",
    ...data.map((county) => county.name).sort(),
  ];
  const populationOptions = [
    "All Populations",
    "Over 100,000",
    "Under 100,000",
  ];
  const sortOptions = ["A to Z", "Z to A"];
  const chlamydiaOptions = ["All Cases", "Over 100", "Under 100"]

  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleClick = (
    id,
    name,
    population,
    ccases,
    gcases,
    scases,
    escases,
    tscases,
    udcases,
    map,
    flag
  ) => {
    // Pass the object as state along with the URL
    nav(`/counties/${name}`, {
      state: {
        id,
        name,
        population,
        ccases,
        gcases,
        scases,
        escases,
        tscases,
        udcases,
        map,
        flag,
      },
    });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset current page to 1 when search term changes
  };

  return (
    <div className="container">
      <div style={{ padding: "20px" }}>
        <h1>Counties</h1>
      </div>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search counties or population..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </Form.Group>
      <div style={{ padding: 10 }}>
        <CustomDropdown
          title="Select County"
          items={countyNames}
          setter={setSelectedCounty}
        />
        <CustomDropdown
          title="Select Population"
          items={populationOptions}
          setter={setSelectedPopulation}
        />
        <CustomDropdown
          title="Select Chlamydia"
          items={chlamydiaOptions}
          setter={setSelectedChlamydia}
        />
        <CustomDropdown
          title="Sort Data"
          items={sortOptions}
          setter={setSortOption}
        />
      </div>
      <Row>
        {currentItems.map((item, index) => (
          <Col
            key={index}
            className="d-flex justify-content-center"
            onClick={() =>
              handleClick(
                item.id,
                item.name,
                item.population,
                item.ccases,
                item.gcases,
                item.scases,
                item.escases,
                item.tscases,
                item.udcases,
                item.map,
                item.flag
              )
            }
          >
            <CountiesCard
              item={item}
              onClick={() =>
                handleClick(
                  item.id,
                  item.name,
                  item.population,
                  item.ccases,
                  item.gcases,
                  item.scases,
                  item.escases,
                  item.tscases,
                  item.udcases,
                  item.map,
                  item.flag
                )
              }
            />
          </Col>
        ))}
      </Row>
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
      <p style={{ position: "relative", bottom: "0px" }}>
        {" "}
        *This refers to Primary and Secondary Syphilis.
      </p>
    </div>
  );
};

export default Counties;
