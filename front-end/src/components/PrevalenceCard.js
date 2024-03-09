import React, { useState } from "react";
import "./Card.css";
import { useNavigate } from "react-router-dom";

const Card = ({ year, disease, sex, cases, rate, id }) => {
  const nav = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const diseaseImageMap = {
    Chlamydia:
      "https://assets.lybrate.com/imgs/tic/enadp/what-are-the-types-of-chlamydia.webp",
    Gonorrhea:
      "https://sexualhealth.gov.mt/sites/default/files/Gonorrhea%20Image%20848px.jpg",
    "Early Syphilis":
      "https://previews.123rf.com/images/artinspiring/artinspiring1909/artinspiring190900408/129656179-syphilis-symptoms-and-risk-factor-infographic-dangerous.jpg",
  };

  const getImageUrlForDisease = (disease) => {
    return diseaseImageMap[disease] || "https://example.com/default.jpg";
  };

  const handleClick = () => {
    nav(`/prevalence/${id}`, {
      state: { year, disease, sex, cases, rate, id },
    });
  };

  return (
    <div
      onClick={handleClick}
      className={`card ${isHovered ? "hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid="card-container" // Added data-testid for testing
    >
      <div className="container">
        <img
          src={getImageUrlForDisease(disease)}
          alt={disease}
          className="transparent-image" // Corrected to className
        />
        <div className="overlay">
          {" "}
          {/* Corrected to className */}
          <b>{year}</b>
        </div>
      </div>
      <div className="card-content">
        <h5>
          <strong>About: </strong>Overview of {sex} {disease} cases in {year}
        </h5>
        <p>
          <strong>Gender: </strong> {sex}
        </p>
        <p>
          <strong>Number of {disease} cases: </strong>
          {cases}
        </p>
        <p>
          <strong>Per 100,000 people: </strong>
          {rate}
        </p>
      </div>
    </div>
  );
};

export default Card;
