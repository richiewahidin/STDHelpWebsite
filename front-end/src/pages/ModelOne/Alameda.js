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

function Alameda() {
    return (
        <div style={{ position: 'relative', padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ marginBottom: '20px' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '10px' }}><strong>Alameda County</strong></h1>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}> County Seat: Oakland </h3>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}> Population: 1,682,353 </h3>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}> <strong>2021 Cases / Rate:</strong></h3>
                <h4 style={{ fontSize: '1rem', marginBottom: '5px' }}> <strong> Chlamydia</strong>: 7455 / 455.9 (19)</h4>
                <h4 style={{ fontSize: '1rem', marginBottom: '5px' }}> <strong> Gonnorhea</strong>: 3810 / 227.9 (14)</h4>
                <h4 style={{ fontSize: '1rem', marginBottom: '5px' }}> <strong> Primary and Secondary Syphilis</strong>: 197 / 11.8 (42)</h4>
                <h4 style={{ fontSize: '1rem', marginBottom: '5px' }}> <strong> Early non-primary non-secondary Syphilis</strong>: 177 / 10.6 (24)</h4>
                <h4 style={{ fontSize: '1rem', marginBottom: '5px' }}> <strong> Total Early Syphilis</strong>: 374 / 22.4 (37)</h4>
                <h4 style={{ fontSize: '1rem', marginBottom: '5px' }}> <strong> Unknown Duration or Late Syphilis</strong>: 305 / 18.2 (38)</h4>
                <p style={{ fontSize: '1rem' }}> The numbers in the brackets are the relative rank of the county in rate of that particular STD.</p>
            </div>
            <div style={{ position: 'absolute', top: '0', right: '0', maxWidth: '300px', marginTop: '20px' , marginRight: '20px'}}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Flag_of_Alameda_County%2C_California.svg/1200px-Flag_of_Alameda_County%2C_California.svg.png" style={{ width: '100%', height: 'auto', maxWidth: '300px' }} alt="Alameda County Flag"/>
            </div>

            {/* google maps embedded, responsive */}
            <div style={{ marginBottom: '20px', clear: 'both' }}>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d808388.4939889722!2d-122.58090328404981!3d37.678169332741724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808ff23734791759%3A0x68c6c7111b137d73!2sAlameda%20County%2C%20CA!5e0!3m2!1sen!2sus!4v1707881716534!5m2!1sen!2sus" style={{ width: "100%", height: "400px", border: "0", allowfullscreen: "", loading: "lazy", referrerpolicy: "no-referrer-when-downgrade" }}></iframe>
            </div>
            <br></br>

            {/* links to instance pages of model 3 */}
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

export default Alameda;
