import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ title, cases, gender, rate, imageUrl, url }) => {
  return (
    <div className="card">
      <img src={imageUrl} alt={title} />
      <div className="card-content">
        <h5><strong>About: </strong>{title}</h5>
        <p><strong>Gender: </strong> {gender}</p>
        <p><strong>Number of cases: </strong>{cases}</p>
        <p><strong>Per 100,000 people: </strong>{rate}</p>
        <a href={url} rel="noopener noreferrer">More Stats</a>
      </div>
    </div>
  );
};

export default Card;