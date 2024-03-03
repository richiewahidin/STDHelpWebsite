import React, { useState } from "react";
import PrevalenceCard from "../../components/PrevalenceCard";
import "./Prevalence.css";
import PrevalenceData from "./PrevalenceData.json";
import Pagination from "@mui/material/Pagination";

const Prevalence = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const cardData = PrevalenceData.prevalence;

  // Find indexes of items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  // Only display 10 items per page.
  const currentItems = cardData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="container">
      <h1>Prevalence of STDs from 2003-2021</h1>
      <div className="grid">
        {/* Map over currentItems instead of cardData */}
        {currentItems.map((item, index) => (
          <PrevalenceCard key={index} {...item} />
        ))}
      </div>
      <Pagination
        count={Math.ceil(cardData.length / itemsPerPage)}
        page={currentPage}
        onChange={handleChange}
        variant="outlined"
        shape="rounded"
        size="large"
        className="pagination"
      />
      <div style={{ padding: 15, paddingBottom: 20 }}>
        Displaying: {indexOfFirstItem + 1} -{" "}
        {Math.min(indexOfLastItem, cardData.length)} out of {cardData.length}
      </div>
    </div>
  );
};

export default Prevalence;
