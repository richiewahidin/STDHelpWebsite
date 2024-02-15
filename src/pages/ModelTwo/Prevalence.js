import React from "react";
import Card from "./PrevalenceCard";
import "./card.css";

const Prevalence = () => {
  const cardData = [
    {
      title: "An overview of female STD cases for the year of 2003.",
      gender: "Female",
      cases: "85,153",
      rate: "479",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/57/Zahl_2003.jpg?20190929125532",
      url: "/prevalence/female2003",
    },
    {
      title: "An overview of male STD cases for the year of 2003.",
      gender: "Male",
      cases: "31,004",
      rate: "176",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/57/Zahl_2003.jpg?20190929125532",
      url: "/prevalence/male2003",
    },
    {
      title: "An overview of female STD cases for the year of 2004.",
      gender: "Female",
      cases: "89,438",
      rate: "497.8",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Zahl_2004.jpg?20190929125535",
      url: "/prevalence/female2004",
    },
    {
      title: "An overview of male STD cases for the year of 2004.",
      gender: "Male",
      cases: "33,652",
      rate: "189.2",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Zahl_2004.jpg?20190929125535",
      url: "/prevalence/male2004",
    },
    // Add more card data as needed
  ];

  return (
    <div className="container">
    <h1 className="centered-header">STD Numbers and Stats 2003-2021 (by gender)</h1>
    <div className="grid">
      {cardData.map((item, index) => (
        <Card
          key={index}
          title={item.title}
          gender={item.gender}
          cases={item.cases}
          rate={item.rate}
          imageUrl={item.imageUrl}
          url={item.url}
        />
      ))}
    </div>
  </div>
  );
};

export default Prevalence;
