import React from 'react';
import { useNavigate } from 'react-router-dom';


const Card = ({id, name, address, website, phonenumber,imageUrl}) => {
  const nav = useNavigate();

  const handleClick = () => {
    //url = "locator/" + id;
    nav(`/locator/${id}`, { state: { id, name, address, website, phonenumber } });
  };

  return (
    <div onClick={handleClick} className="card">
      <img src={imageUrl} alt={name} />
      <div className="card-content">
        <h5><strong>{name}</strong></h5>
        <p><strong>Address: </strong> {address}</p>
        <p><strong>Website: </strong> {website}</p>
        <p><strong>Phone: </strong>{phonenumber}</p>
      </div>
    </div>
  );
};

export default Card;