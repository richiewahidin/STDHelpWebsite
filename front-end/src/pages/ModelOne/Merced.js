import React from 'react';
import Card from "../../components/LocatorCard";
import ALPA from '../../images/Model3/APLA.png';
import AltaMed from '../../images/Model3/AltaMed.png';
import Torrance from '../../images/Model3/Torrance.png';

const cardData = [
    {
      title: "ALPA Health",
      Address: "5901 W Olympic Blvd Ste 310 Los Angeles",
      ZipCode: "90036",
      Services: "HIV testing",
      Phone: "3232151725",
      imageUrl: ALPA,
      url: "/locator/ALPA"
    },
    {
      title: "AltaMed Medical Group",
      Address: "5427 E Whittier Blvd Los Angeles, CA 90022",
      ZipCode: "90022",
      Services: "STI testing and Treatment, Mpox Vaccine",
      Phone: "3234006399, 8884999303 (Mpox Vaccine)",
      imageUrl: AltaMed,
      url: "/locator/Alta"
    },
    {
      title: "Torrance Urgent Care",
      Address: "2195 Sepulveda Blvd Torrance US, CA 90501",
      ZipCode: "90501",
      Services: "PEP",
      Phone: "4243371600",
      imageUrl: Torrance,
      url: "/locator/Torrance"
    },
  ];

function Merced() {
    return (
        <div style={{ position: 'relative', padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ marginBottom: '20px' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '10px' }}><strong>Merced County</strong></h1>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}> County Seat: Merced </h3>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}> Population: 281,202 </h3>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}> <strong>2021 Cases / Rate:</strong></h3>
                <h4 style={{ fontSize: '1rem', marginBottom: '5px' }}> <strong> Chlamydia</strong>: 1101 / 388.8 (25)</h4>
                <h4 style={{ fontSize: '1rem', marginBottom: '5px' }}> <strong> Gonnorhea</strong>: 490 / 173.0 (22)</h4>
                <h4 style={{ fontSize: '1rem', marginBottom: '5px' }}> <strong> Primary and Secondary Syphilis</strong>: 75 / 26.5 (15)</h4>
                <h4 style={{ fontSize: '1rem', marginBottom: '5px' }}> <strong> Early non-primary non-secondary Syphilis</strong>: 21 / 7.4 (37)</h4>
                <h4 style={{ fontSize: '1rem', marginBottom: '5px' }}> <strong> Total Early Syphilis</strong>: 96 / 33.9 (23)</h4>
                <h4 style={{ fontSize: '1rem', marginBottom: '5px' }}> <strong> Unknown Duration or Late Syphilis</strong>: 152 / 53.7 (9)</h4>
                <p style={{ fontSize: '1rem' }}> The numbers in the brackets are the relative rank of the county in rate of that particular STD.</p>
            </div>
            <div style={{ position: 'absolute', top: '0', right: '0', maxWidth: '300px', marginTop: '20px' , marginRight: '20px'}}>
                <img src="data:image/png;base64,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" style={{ width: '100%', height: 'auto', maxWidth: '300px' }} alt="Los Angeles County Flag"/>
            </div>
            {/* embed google maps, responsive */}
            <div style={{ marginBottom: '20px', clear: 'both' }}>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d813711.939095795!2d-120.65035090000002!3d37.186872550000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80914050f7997157%3A0x7674e2402cd9e96b!2sMerced%20County%2C%20CA!5e0!3m2!1sen!2sus!4v1707892866685!5m2!1sen!2sus" style={{ width: "100%", height: "400px", border: "0", allowfullscreen: "", loading: "lazy", referrerpolicy: "no-referrer-when-downgrade" }}></iframe>
            </div>

            {/* links to instances of model 3 */}
            <br></br>
            <h4> <strong> Locations in this county *(locations not correct for this phase): </strong></h4>
            <div className="grid" style={{alignContent:'flex-start'}} >
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
    )
}

export default Merced;
