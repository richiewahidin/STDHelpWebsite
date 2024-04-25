import { Form } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import Card from "../../components/PrevalenceCard";
import "./Prevalence.css";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import CustomDropdown from "../../components/DropDown";

const Prevalence = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [data, setData] = useState([]);
  const [countyData, setCountyData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState(""); // State to hold the selected year
  const [selectedCounty, setSelectedCounty] = useState("");
  const [selectedPopulation, setSelectedPopulation] = useState("");
  const [selectedSex, setSelectedSex] = useState("");
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://d1ahbxgizovdow.cloudfront.net/prevalence"
        );
        setData(response.data.rows);
        setSortOption("A to Z");
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
  const countyMapPop = countyData.reduce((pcc, curr) => {
    pcc[curr.id] = curr.population;
    return pcc;
  }, {});

  const searchData = data.filter((item) => {
    const countyName = countyMap[item.countyid]?.toLowerCase();
    const year = item.year.toLowerCase();
    const sex = item.sex.toLowerCase();
    const male = "male";
    const searchWords = searchTerm.toLowerCase().split(" ");
    const populationStringWithCommas = countyMapPop[item.countyid]; // This should be a string with commas.
    const populationStringWithoutCommas = populationStringWithCommas.replace(
      /,/g,
      ""
    );
    const population = parseInt(populationStringWithoutCommas, 10);
    console.log(population);

    return (
      searchWords.every(
        (word) =>
          countyName.includes(word) ||
          year.startsWith(word) ||
          (sex.includes(word) && sex === "male") ||
          (sex.includes(word) && !male.includes(word) && sex === "female") ||
          (sex.includes(word) && sex === "total")
      ) &&
      (selectedYear && selectedYear !== "All Years"
        ? year === selectedYear.toLowerCase()
        : true) &&
      (selectedCounty && selectedCounty !== "All Counties"
        ? countyName === selectedCounty.toLowerCase()
        : true) &&
      (selectedPopulation === "Over 100,000"
        ? population > 100000
        : selectedPopulation === "Under 100,000"
        ? population <= 100000
        : true) &&
      (selectedSex && selectedSex !== "All"
        ? sex === selectedSex.toLowerCase()
        : true)
    );
  });

  if (sortOption === "A to Z") {
    searchData.sort((a, b) =>
      countyMap[a.countyid].localeCompare(countyMap[b.countyid])
    );
    searchData.sort((a, b) => a.year - b.year);
  } else if (sortOption === "Year Ascending") {
    searchData.sort((a, b) => a.year - b.year);
  }

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
  const years = [
    "All Years",
    ...Array.from({ length: 21 }, (_, i) => (2001 + i).toString()),
  ];
  // Get all county names for dropdown
  const countyNames = [
    "All Counties",
    ...countyData.map((county) => county.name).sort(),
  ];
  const populationOptions = ["All", "Over 100,000", "Under 100,000"];
  const sexOptions = ["All", "Male", "Female", "Total"];
  const sortOptions = ["A to Z", "Year Ascending"];

  return (
    <div className="container">
      <h1>Prevalence</h1>
      <div>
        <h5>
          Prevalence of STDs from 2001-2021. Each instance displays a year of
          STD data for a county in California. Each instance is also separated
          by gender: male, female, or total cases for that year in that county.
          Displayed on each instance card is the county's name, population for
          that year and total number of Chlamydia, Syphilis, and Gonorrhea
          cases.
        </h5>
      </div>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search by county name, year, sex..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </Form.Group>
      <div
        style={{ padding: 10, display: "flex", flexWrap: "wrap", gap: "5px" }}
      >
        <CustomDropdown
          title="Select Year"
          items={years}
          setter={setSelectedYear}
        />
        <CustomDropdown
          title="Select Gender"
          items={sexOptions}
          setter={setSelectedSex}
        />
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
          title="Sort Data"
          items={sortOptions}
          setter={setSortOption}
        />
      </div>
      <div className="grid">
        {currentItems.map((item, index) => (
          <Card key={index} {...item} searchTerm={searchTerm} />
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
        {Math.min(indexOfLastItem, searchData.length)} out of{" "}
        {searchData.length}
      </div>
    </div>
  );
};

export default Prevalence;
