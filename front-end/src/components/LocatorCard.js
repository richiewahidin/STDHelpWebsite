import React from 'react';
import { useNavigate } from 'react-router-dom';


const Card = ({id, title, Address, Website, Services, Phone, imageUrl}) => {
  const nav = useNavigate();

  const handleClick = () => {
    //url = "locator/" + id;
    nav(id);
  };
  // //for hovering
  // const handleEnter = () => {
  //   setIsHovered(true);
  // };

  // const handleLeave = () => {
  //   setIsHovered(false);
  // };

  return (
    <div onClick={handleClick} className="card">
      <img src={imageUrl} alt={title} />
      <div className="card-content">
        <h5><strong>{title}</strong></h5>
        <p><strong>Address: </strong> {Address}</p>
        <p><strong>Website: </strong> {Website}</p>
        <p><strong>Services: </strong>{Services}</p>
        <p><strong>Phone: </strong>{Phone}</p>
      </div>
    </div>
  );
};

export default Card;