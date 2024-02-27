import React from "react";
import PrevalenceCard from "../../components/PrevalenceCard";
import "./Prevalence.css"
import PrevalenceData from "./PrevalenceData.json";

const Prevalence = () => {
  const cardData = PrevalenceData.prevalence;

  return (
    <div class="container">
      <h1>Prevalence of STDs from 2003-2021</h1>
      <div className="grid">
        {cardData.map((item, index) => {
          return (
            <PrevalenceCard key={index} {...item}/>
          )
        })}
      </div>
      <div style={{padding: 50, paddingBottom: 50}}>
        Displaying: {cardData.length} out of {cardData.length}
      </div>
    </div>
  );
};

export default Prevalence;
