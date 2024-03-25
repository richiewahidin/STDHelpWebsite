import React from 'react';
import Card from "../../components/LocatorCard";
import CountiesData from "./CountiesData.json";
import { useParams } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import LocatorData from "../Model3/LocatorData";

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

  return (
    <div style={{ position: 'relative', padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '20px' }}>
            <h1><strong>{instanceCounties.name} County</strong></h1>

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

        {/* Adds links to other instances from model 1 */}
        <h4> <strong> Locations in this county *(locations not correct for this phase): </strong></h4>
        <div className="grid" style={{alignContent:'flex-start', justifyContent: 'center'}} >
            {LocatorData.Locator.map((item, index) => (
                <Card
                  key={index}
                  title={item.title}
                  Address={item.Address}
                  ZipCode={item.ZipCode}
                  Services={item.Services}
                  Phone={item.Phone}
                  imageUrl={item.imageUrl}
                  url={item.url}
                />
                ))}
        </div>  
    </div>
  );
};

export default CountiesInstance;
