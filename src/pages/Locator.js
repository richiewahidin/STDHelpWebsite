import React from "react";
import Card from "../components/LocatorCard";
import ALPA from '../images/Model3/APLA.png';
import AltaMed from '../images/Model3/AltaMed.png';
import Torrance from '../images/Model3/Torrance.png';
//import "../components/card.css";

const Locator = () => {
  const cardData = [
    {
      title: "ALPA Health",
      Address: "5901 W Olympic Blvd Ste 310 Los Angeles",
      ZipCode: "90036",
      Services: "HIV testing",
      Phone: "3232151725",
      imageUrl: ALPA,
    },
    {
      title: "AltaMed Medical Group",
      Address: "5427 E Whittier Blvd Los Angeles, CA 90022",
      ZipCode: "90022",
      Services: "STI testing and Treatment, Mpox Vaccine",
      Phone: "3234006399, 8884999303 (Mpox Vaccine)",
      imageUrl: AltaMed,
    },
    {
      title: "Torrance Urgent Care",
      Address: "2195 Sepulveda Blvd Torrance US, CA 90501",
      ZipCode: "90501",
      Services: "PEP",
      Phone: "4243371600",
      imageUrl: Torrance,
    },
  ];

  return (
    <div className="grid">
      {cardData.map((item, index) => (
        <Card
          key={index}
          title={item.title}
          Address={item.Address}
          ZipCode={item.ZipCode}
          Services={item.Services}
          Phone={item.Phone}
          imageUrl={item.imageUrl}
        />
      ))}
    </div>
  );
};

export default Locator;
