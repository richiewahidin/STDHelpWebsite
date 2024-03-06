import React from 'react';
import Card from "../../components/LocatorCard";
import ALPA from '../../images/Model3/APLA.png';
import AltaMed from '../../images/Model3/AltaMed.png';
import Torrance from '../../images/Model3/Torrance.png';
import CountiesData from "./CountiesData.json";
import { useParams } from 'react-router-dom';
import { cardData } from "../Model3/Locator"

const CountiesInstance = () => {
  let { id } = useParams();
  const county = CountiesData.counties.find((county) => county.id === id);

  if (!county) {
    return <div>County not found</div>;
  }

  return (
    <div style={{ position: 'relative', padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '20px' }}>
            <h1><strong>{county.name} County</strong></h1>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%' }}>
                <div style={{ flex: '0 0 60%', marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}> County Seat: {county.countySeat} </h3>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}> Population: {county.population} </h3>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}> <strong>2021 Cases / Rate:</strong></h3>
                    <h4 style={{ fontSize: '1rem', marginBottom: '5px' }}> <strong> Chlamydia</strong>: {county.chlamydiaCases} / {county.chlamydiaRate} ({county.chlamydiaRank})</h4>
                    <h4 style={{ fontSize: '1rem', marginBottom: '5px' }}> <strong> Gonnorhea</strong>: {county.gonnorheaCases} / {county.gonnorheaRate} ({county.gonnorheaRank})</h4>
                    <h4 style={{ fontSize: '1rem', marginBottom: '5px' }}> <strong> Primary and Secondary Syphilis</strong>: {county.pssCases} / {county.pssRate} ({county.pssRank})</h4>
                    <h4 style={{ fontSize: '1rem', marginBottom: '5px' }}> <strong> Early non-primary non-secondary Syphilis</strong>: {county.enpnssCases} / {county.enpnssRate} ({county.enpnssRank})</h4>
                    <h4 style={{ fontSize: '1rem', marginBottom: '5px' }}> <strong> Total Early Syphilis</strong>: {county.tesCases} / {county.tesRate} ({county.tesRank})</h4>
                    <h4 style={{ fontSize: '1rem', marginBottom: '5px' }}> <strong> Unknown Duration or Late Syphilis</strong>: {county.udlssCases} / {county.udlssRate} ({county.enpnssRank})</h4>
                </div>
                <div style={{ flex: '0 0 50%', maxWidth: '300px', position: 'relative' }}>
                  <img src={county.flagUrl} style={{ width: '100%', height: 'auto' }}/>
                </div>
                <p style={{ fontSize: '1rem' }}> The numbers in the brackets are the relative rank of the county in rate of that particular STD.</p>
            </div>
        </div>

        {/* google maps embedded, responsive */}
        <div style={{ marginBottom: '20px', clear: 'both' }}>
            <iframe src={county.mapUrl} style={{ width: "100%", height: "400px", border: "0", allowfullscreen: "", loading: "lazy", referrerpolicy: "no-referrer-when-downgrade" }}></iframe>
        </div>
        <br></br>

        {/* Adds links to other instances from model 1 */}
        <h4> <strong> Locations in this county *(locations not correct for this phase): </strong></h4>
        <div className="grid" style={{alignContent:'flex-start', justifyContent: 'center'}} >
            {cardData.map((item, index) => (
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