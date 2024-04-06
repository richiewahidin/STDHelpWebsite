import axios from 'axios';
import React, { useState, useEffect } from 'react';
import PrevalenceCard from "../../components/PrevalenceCard";
import LocatorCard from "../../components/LocatorCard";
import { useLocation } from "react-router-dom";

const CountiesInstance = () => {
    const location = useLocation();
    const { id, name, population, ccases, gcases, scases, escases, tscases, udcases, map, flag} = location.state;
  
    // Create a prevalence instance
    const instanceCounties = {
      id: id,
      name: name, 
      population: population, 
      ccases: ccases, 
      gcases: gcases, 
      scases: scases, 
      escases: escases, 
      tscases: tscases, 
      udcases: udcases,
      mapurl: map,
      flagurl: flag,
    };

    const [prevalenceData, setPrevalenceData] = useState([]);
    const [locatorData, setLocatorData] = useState([]);

    useEffect(() => {
      const fetchPrevalenceData = async () => {
        try {
          const response = await axios.get(
            "https://d1ahbxgizovdow.cloudfront.net/prevalence"
          );
          setPrevalenceData(response.data.rows);
        } catch (error) {
          console.error("Error fetching prevalence data:", error);
        }
      };

      fetchPrevalenceData();
    }, []);

    useEffect(() => {
      const fetchLocatorData = async () => {
        try {
          const response = await axios.get(
            "https://d1ahbxgizovdow.cloudfront.net/treatmentcenter"
          );
          setLocatorData(response.data.rows);
        } catch (error) {
          console.error("Error fetching locator data:", error);
        }
      };

      fetchLocatorData();
    }, []);

    const filteredPrevalenceData = prevalenceData.filter(item =>
      item.countyid === id && item.year === "2021"
    );

    const filteredLocatorData = locatorData.filter(item =>
      item.countyId === id
    );
    
  return (
    <div style={{ position: 'relative', paddingLeft: '200px', paddingRight: '200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '20px' }}>
        {!instanceCounties.name.includes('*') ? (
          <h1><strong>{instanceCounties.name} County</strong></h1>
        ) : (
          <h1><strong>{instanceCounties.name} City </strong></h1>
        )}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%' }}>
            <div style={{ flex: '0 0 60%', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}> Population: {instanceCounties.population} </h3>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}> <strong>2021 Cases:</strong></h3>
                <h4 style={{ fontSize: '1rem', marginBottom: '5px' }}> <strong> Chlamydia</strong>: {instanceCounties.ccases} </h4>
                <h4 style={{ fontSize: '1rem', marginBottom: '5px' }}> <strong> Gonnorhea</strong>: {instanceCounties.gcases}</h4>
                <h4 style={{ fontSize: '1rem', marginBottom: '5px' }}> <strong> Primary and Secondary Syphilis</strong>: {instanceCounties.scases} </h4>
                <h4 style={{ fontSize: '1rem', marginBottom: '5px' }}> <strong> Early non-primary non-secondary Syphilis</strong>: {instanceCounties.escases} </h4>
                <h4 style={{ fontSize: '1rem', marginBottom: '5px' }}> <strong> Total Early Syphilis</strong>: {instanceCounties.tscases} </h4>
                <h4 style={{ fontSize: '1rem', marginBottom: '5px' }}> <strong> Unknown Duration or Late Syphilis</strong>: {instanceCounties.udcases} </h4>
            </div>
              <div style={{ flex: '0 0 50%', maxWidth: '300px', position: 'relative' }}>
                <img src={instanceCounties.flagurl} style={{ width: '100%', height: 'auto' }}/>
              </div>
        </div>
        </div>
         {/* google maps embedded, responsive */}
        <div style={{ marginBottom: '20px', clear: 'both' }}>
            <iframe src={instanceCounties.mapurl} style={{ width: "100%", height: "400px", border: "0", allowfullscreen: "", loading: "lazy", referrerpolicy: "no-referrer-when-downgrade" }}></iframe>
        </div> 
        <br></br>

        {!instanceCounties.name.includes('*') ? (
          <div>
            <h4>Prevalence Data for {name} County in 2021:</h4>
            <div className="grid" style={{ display: 'flex', width: '100%', justifyContent: 'center'}}>
            {filteredPrevalenceData.map((item, index) => (
              <div key={index} style={{ width: '55%'}}>
              <PrevalenceCard {...item} />
              </div>
            ))}
            </div>
            <h4> Treatment Centers in {name} County: </h4>
            <div className="grid" style={{ display: 'flex', width: '100%', justifyContent: 'center'}}>
            {filteredLocatorData.map((item, index) => (
              <div key={index} style={{ width: '55%'}}>
                <LocatorCard key={index} {...item} />
              </div>
            ))}
            </div>
          </div>
        ) : (
          <h4> No Prevalence Data or Treatment Centers for individual cities. </h4>
        )}
    </div>
  );
};

export default CountiesInstance;
