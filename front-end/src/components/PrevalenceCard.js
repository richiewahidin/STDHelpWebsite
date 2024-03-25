import React, { useState, useEffect } from "react";
import "./Card.css";
import { useNavigate } from "react-router-dom";

const Card = ({ id, countyid, year, sex, population, c_cases, c_rate, s_cases, s_rate, g_cases, g_rate, countyimage }) => {
  const nav = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const [countyName, setCountyName] = useState('');

  useEffect(() => {
    fetch(`https://d1ahbxgizovdow.cloudfront.net/county/${countyid}`)
      .then(response => response.json())
      .then(data => {
        if (data && data.rows && data.rows.length > 0) {
          setCountyName(data.rows[0].name);
        }
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, [id]);

  const handleClick = () => {
    nav(`/prevalence/${id}`, {
      state: { id, year, sex, population, c_cases, c_rate, s_cases, s_rate, g_cases, g_rate, countyimage, countyName },
    });
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
          alt={countyimage}
          className="transparent-image"
        />
        <div className="overlay">
          {" "}
          {/* Corrected to className */}
          <b>{year}</b>
        </div>
      </div>
      <div className="card-content">
        <h5>
          <strong>About: </strong>Overview of {sex} STD cases for {countyName} in {year}
        </h5>
        <p>
          <strong>Gender: </strong> {sex}
        </p>
        <p>
          <strong>Number of Chlamydia cases: </strong>
          {c_cases}
        </p>
        <p>
          <strong>Number of Syphillis cases: </strong>
          {s_cases}
        </p>
        <p>
          <strong>Number of Gonorrhea cases: </strong>
          {g_cases}
        </p>
      </div>
    </div>
  );
};

export default Card;
