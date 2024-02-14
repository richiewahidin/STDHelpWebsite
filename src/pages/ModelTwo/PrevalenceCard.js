import React from 'react';

const Card = ({ title, cases, gender, rate, imageUrl }) => {
  return (
    <div className="card">
      <img src={imageUrl} alt={title} />
      <div className="card-content">
        <h5><strong>About: </strong>{title}</h5>
        <p><strong>Gender: </strong> {gender}</p>
        <p><strong>Number of cases: </strong>{cases}</p>
        <p><strong>Per 100,000 people: </strong>{rate}</p>
      </div>
    </div>
  );
};

export default Card;