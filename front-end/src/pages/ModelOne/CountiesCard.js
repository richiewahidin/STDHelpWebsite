// CountiesCard.js
import React from 'react';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';

const CountiesCard = ({ item, onClick }) => {
  return (
    <Card style={{ width: '20rem' }} onClick={onClick}>
      <Card.Img src={item.img} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
      <Card.Body>
        <Card.Title>{item.name}</Card.Title>
        <Card.Text>
          <ListGroup className='list-group-flush'>
            <ListGroupItem>
              Population: {item.population}<br />
            </ListGroupItem>
            <ListGroupItem>
              <strong>2021 cases:</strong><br />
              &ensp; Chlamydia: {item.ccases}<br />
              &ensp; Gonorrhea: {item.gcases}<br />
              &ensp; Syphilis*: {item.scases}<br />
            </ListGroupItem>
          </ListGroup>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CountiesCard;
