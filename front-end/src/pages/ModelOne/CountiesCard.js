import React from 'react';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Card = ({ imageUrl, county, countySeat, chlamydia, gonnorhea, syphilis }) => {
  return (
    <Card style={{ width: '20rem' }}>
    <Card.Img src="imageUrl" width = "200" height = "200"/>
    <Card.Body>
        <Card.Title>county</Card.Title>
        <Card.Text>
            <ListGroup className='list-group-flush'>
                <ListGroupItem>
                    <strong>County Seat: </strong>{countySeat}<br></br>
                    <strong>Population: </strong>{population}<br></br>
                </ListGroupItem>
                <ListGroupItem>
                    2021 cases:<br></br>
                    <strong> &emsp; Chlamydia: </strong>{chlamydia}<br></br>
                    <strong> &emsp; Gonnorhea: </strong>{gonnorhea}<br></br>
                    <strong> &emsp; Primary and Secondary Syphilis: </strong>{syphilis}<br></br>
                </ListGroupItem>
            </ListGroup>
        </Card.Text>
        <Link to="/home" className="btn btn-primary">Learn more</Link>
    </Card.Body>
</Card>
  );
};

export default Card;
