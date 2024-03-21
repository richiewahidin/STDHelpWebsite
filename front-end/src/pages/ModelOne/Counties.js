import { Card, Col, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { Link, useNavigate} from 'react-router-dom';
import Pagination from "@mui/material/Pagination";
import './Counties.css';
import axios from "axios";
import React, { useState, useEffect } from "react";

const Counties = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(9);
    const [data, setData] = useState([]); // Initialize data state as an empty array
    const nav = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://d1ahbxgizovdow.cloudfront.net/county"
        );
        setData(response.data.rows); // Update state with fetched data rows
        console.log(response.data.rows);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleClick = (id, name, population, ccases, gcases, scases, escases, tscases, udcases, map, flag) => {
    // Pass the object as state along with the URL
    nav(`/counties/${name}`, { state: {id, name, population, ccases, gcases, scases, escases, tscases, udcases, map, flag} });
  };

  return (
    <div className="container">
      <div style={{ padding: '20px' }}>
        <h1>Counties</h1>
      </div>
      <Row>
        {currentItems.map((item, index) => (
          <Col key={index} className="d-flex justify-content-center" onClick={() => handleClick(item.id, item.name, item.population, item.ccases, item.gcases, item.scases, item.escases, item.tscases, item.udcases, item.map, item.flag)}>
            <Card style={{ width: '20rem' }}>
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
          </Col>
        ))}
      </Row>
      <Pagination
        count={Math.ceil(data.length / itemsPerPage)}
        page={currentPage}
        onChange={handleChange}
        variant="outlined"
        shape="rounded"
        size="large"
        className="pagination"
      />
      <div style={{ padding: 15, paddingBottom: 20 }}>
        Displaying: {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, data.length)} out of {data.length}
      </div>
      <p style={{ position: 'relative', bottom: '0px' }}> *This refers to Primary and Secondary Syphilis.</p>
    </div>
  );
}

export default Counties;