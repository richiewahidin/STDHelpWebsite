import React from "react";
import Card from "../components/LocatorCard";
//import "../components/card.css";

const Locator = () => {
  const cardData = [
    {
      title: "ALPA Health",
      Address: "5901 W Olympic Blvd Ste 310 Los Angeles",
      ZipCode: "90036",
      Services: "HIV testing",
      Phone: "3232151725",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/57/Zahl_2003.jpg?20190929125532",
    },
    {
      title: "AltaMed Medical Group",
      Address: "5427 E Whittier Blvd Los Angeles, CA 90022",
      ZipCode: "90022",
      Services: "STI testing and Treatment",
      Phone: "3234006399, 8884999303 (Mpox Vaccine)",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/57/Zahl_2003.jpg?20190929125532",
    },
    {
      title: "ALPA Health",
      Address: "5901 W Olympic Blvd Ste 310 Los Angeles",
      ZipCode: "90036",
      Services: "HIV testing",
      Phone: "3232151725",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/57/Zahl_2003.jpg?20190929125532",
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
