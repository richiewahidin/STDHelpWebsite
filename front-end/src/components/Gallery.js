import React from "react";
import CharacterOne from "../images/Gallery/characterOne.png";
import CharacterTwo from "../images/Gallery/characterTwo.png";
import CharacterThree from "../images/Gallery/characterThree.png"
import CharacterFour from "../images/Gallery/characterFour.png"

const HomePageGallery = () => {
  const imageStyling = {
    maxWidth: "200px",
    maxHeight: "200px",
    border: "none", // Remove border around the image
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    paddingLeft: "25px",
    paddingRight: "25px",
    //width: "95%"
  };

  const testimonyStyle = {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    border: "1px solid black", // Adding border around each entry
    padding: "10px", // Adding padding within each entry
    paddingBottom: "1rem",
    background: "#A52A2A"
  };

  const testimonies = [
    {
      image: CharacterOne,
      caption:
        "\"My advice would be to wear protection every single time and get tested beforehand for all STDs. Don’t trust someone just because they swear they do not have something. Take charge of your sexual health and be aware that it only takes one time to get anything.\" - Leo",
    },
    {
      image: CharacterTwo,
      caption: "\"Most people think they are immune to STDs, most of the times they are afraid to have themselves checked and still think they are 100% healthy.  No matter how much you love your partner, and trust him, wear a condom and have enough of them, he might not know he is carrying a disease. When you decide to have sex without protection for whatever reason, you both should be checked before.\" -Luna",
    },
    {
      image: CharacterThree,
      caption: "\"I ended up going to get tested and had more than one strain of gonorrhea, so I had to get multiple shots, antibiotics, and have my gastroenterologist place my colon back inside of my body. If I hadn't waited, my issues would not have escalated so badly\" - Unidentified Male",
    },
    {
        image: CharacterFour,
        caption: "\"Now I look back and think about all the anxiety attacks and damage to my mental health I could have avoided by just getting tested. HIV is not a death sentence; you’ll treat it for the rest of your life but you’ll be okay. Don’t let fear get in your way. I promise that no matter the result, it’s just better to know because then you can move on with life.\" - Cebokazi"
    }
  ];

  return (
    <div style={containerStyle}>
      {testimonies.map((testimony, index) => (
        <div key={index} style={testimonyStyle}>
          <img
            src={testimony.image}
            alt={`Testimony ${index}`}
            style={imageStyling}
          />
          <p style={{color:"white", fontSize:"25px"}}>{testimony.caption}</p>
        </div>
      ))}
    </div>
  );
};

export default HomePageGallery;
