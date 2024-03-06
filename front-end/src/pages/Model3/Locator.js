import React from "react";
import Card from "../../components/LocatorCard";
import ALPA from '../../images/Model3/APLA.png';
import AltaMed from '../../images/Model3/AltaMed.png';
import Torrance from '../../images/Model3/Torrance.png';

const cardData = [
  {
    title: "ALPA Health",
    Address: "5901 W Olympic Blvd Ste 310 Los Angeles, 90036",
    Website: "https://aplahealth.org/",
    Services: "HIV testing",
    Phone: "3232151725",
    imageUrl: ALPA,
    url: "/locator/ALPA",
  },
  {
    title: "AltaMed Medical Group",
    Address: "5427 E Whittier Blvd Los Angeles, 90022",
    Website: "https://www.altamed.org/",
    Services: "STI testing and Treatment, Mpox Vaccine",
    Phone: "3234006399, 8884999303 (Mpox Vaccine)",
    imageUrl: AltaMed,
    url: "/locator/Alta",
  },
  {
    title: "Torrance Urgent Care",
    Address: "2195 Sepulveda Blvd Torrance US, 90501",
    Website: "https://exerurgentcare.com/locations_blue/torrance-north/",
    Services: "PEP",
    Phone: "4243371600",
    imageUrl: Torrance,
    url: "/locator/Torrance",
  },
];

const Locator = () => {
  return (
    <div className="grid">
      {cardData.map((item, index) => (
        <Card
          key={index}
          title={item.title}
          Address={item.Address}
          Website={item.Website}
          Services={item.Services}
          Phone={item.Phone}
          imageUrl={item.imageUrl}
          url = {item.url}
        />
      ))}
    </div>
  );
};

export default Locator;
export {cardData};