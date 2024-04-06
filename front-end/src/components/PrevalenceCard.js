import React, { useState, useEffect } from "react";
import "./Card.css";
import { useNavigate } from "react-router-dom";

const Card = ({
  id,
  countyid,
  year,
  sex,
  population,
  c_cases,
  c_rate,
  s_cases,
  s_rate,
  g_cases,
  g_rate,
  countyimage,
  searchTerm
}) => {
  const nav = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [countyData, setCountyData] = useState(null);

  useEffect(() => {
    fetch(`https://d1ahbxgizovdow.cloudfront.net/county/${countyid}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.rows && data.rows.length > 0) {
          setCountyData(data.rows[0]);
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [countyid]);

  const handleClick = () => {
    nav(`/prevalence/${id}`, {
      state: {
        id,
        countyid,
        year,
        sex,
        population,
        c_cases,
        c_rate,
        s_cases,
        s_rate,
        g_cases,
        g_rate,
        countyimage,
        countyData, // Pass all county data here
      },
    });
  };

  const highlightMatch = (text) => {
    if (!searchTerm || !text) return text;
  
    const searchTerms = searchTerm.split(" ").filter((term) => term.trim() !== "");
  
    let highlightedText = text;
    searchTerms.forEach((term) => {
      const pattern = new RegExp(`(${term})`, "gi");
      highlightedText = highlightedText.replace(pattern, `<mark>$1</mark>`);
    });
  
    return (
      <span
        dangerouslySetInnerHTML={{ __html: highlightedText }}
        data-testid="highlighted-text"
      />
    );
  };

  return (
    <div
      onClick={handleClick}
      className={`card ${isHovered ? "hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid="card-container"
    >
      <div className="container">
        <img
          src={countyimage}
          alt={countyData && countyData.img}
          className="transparent-image"
        />
        <div className="overlay">
          <b>{highlightMatch(year)}</b>
        </div>
      </div>
      <div className="card-content">
        <h5>
          <strong>About: </strong>Overview of {highlightMatch(sex)} STD cases for{" "}
          {countyData && highlightMatch(countyData.name)} in {highlightMatch(year)}
        </h5>
        {countyData && (
          <>
            <p>
              <strong>County Name: </strong> {highlightMatch(countyData.name)}
            </p>
            <p>
              <strong>County Population: </strong>{" "}
              {highlightMatch(countyData.population)}
            </p>
          </>
        )}
        <p>
          <strong>Gender: </strong> {highlightMatch(sex)}
        </p>
        <p>
          <strong>Number of Chlamydia cases: </strong>
          {highlightMatch(c_cases)}
        </p>
        <p>
          <strong>Number of Syphilis cases: </strong>
          {highlightMatch(s_cases)}
        </p>
        <p>
          <strong>Number of Gonorrhea cases: </strong>
          {highlightMatch(g_cases)}
        </p>
      </div>
    </div>
  );
};

export default Card;
