import React from 'react';

const Card = ({ title, Address, Website, Services, Phone, imageUrl }) => {
  return (
    <div className="card">
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