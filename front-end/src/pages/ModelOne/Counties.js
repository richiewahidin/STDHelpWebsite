import React from 'react';
import { Card, Col, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CountiesData from "./CountiesData.json";
import Pagination from "@mui/material/Pagination";
import './Counties.css';

const Counties = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage] = React.useState(20);
  const countyData = CountiesData.counties;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = countyData.slice(indexOfFirstItem, indexOfLastItem);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="container">
      <div style={{ padding: '20px' }}>
        <h1>Counties</h1>
      </div>
      <Row>
        {currentItems.map((item, index) => (
          <Col key={index} className="d-flex justify-content-center">
            <Card style={{ width: '20rem' }}>
              <Card.Img src={item.imageUrl} width="200" height="200" />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>
                  <ListGroup className='list-group-flush'>
                    <ListGroupItem>
                      County Seat: {item.countySeat}<br />
                      Population: {item.population}<br />
                    </ListGroupItem>
                    <ListGroupItem>
                      <strong>2021 cases:</strong><br />
                      &ensp; Chlamydia: {item.chlamydiaCases}<br />
                      &ensp; Gonorrhea: {item.gonorrheaCases}<br />
                      &ensp; Syphilis*: {item.pssCases}<br />
                    </ListGroupItem>
                  </ListGroup>
                </Card.Text>
                <Link to={item.relatedLink} className="btn btn-primary">Learn more</Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Pagination
        count={Math.ceil(countyData.length / itemsPerPage)}
        page={currentPage}
        onChange={handleChange}
        variant="outlined"
        shape="rounded"
        size="large"
        className="pagination"
      />
      <div style={{ padding: 15, paddingBottom: 20 }}>
        Displaying: {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, countyData.length)} out of {countyData.length}
      </div>
      <p style={{ position: 'relative', bottom: '0px' }}> *This refers to Primary and Secondary Syphilis.</p>
    </div>
  );
}

export default Counties;
