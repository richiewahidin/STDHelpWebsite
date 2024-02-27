import React, { useState } from 'react';
import "./Card.css"
import { useNavigate } from 'react-router-dom';

const Card = ({ title, chlamydia_cases, gender, chlamydia_rate, imageUrl, url }) => {
    const nav = useNavigate();
    const [isHovered, setIsHovered] = useState(false);

    const handleClick = () => {
      nav(url);
    };
    return (
      <div onClick={handleClick} className={`card ${isHovered ? 'hovered' : ''}`}
           onMouseEnter={() => setIsHovered(true)}
           onMouseLeave={() => setIsHovered(false)}>
        <img src={imageUrl} alt={title} />
        <div className="card-content">
          <h5><strong>About: </strong>{title}</h5>
          <p><strong>Gender: </strong> {gender}</p>
          <p><strong>Number of chlamydia cases: </strong>{chlamydia_cases}</p>
          <p><strong>Per 100,000 people: </strong>{chlamydia_rate}</p>
        </div>
      </div>
    );
};

export default Card;