import React, { useState } from "react";
import LocatorCard from "../../components/LocatorCard";
//import "./Loca.css";
import LocatorData from "./LocatorData.json";
import Pagination from "@mui/material/Pagination";

const Locator = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const cardData = LocatorData.Locator;

  // Find indexes of items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };
  const currentItems = cardData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="container">
      <h1>Locator</h1>
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

export default Locator;
