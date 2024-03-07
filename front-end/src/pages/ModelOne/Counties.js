import React, { useEffect } from "react";
import { Card, Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import CountiesData from "./CountiesData.json";
import Pagination from "@mui/material/Pagination";
import "./Counties.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

  const nav = useNavigate();
  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
    };
    // async function fetchData() {
    //   await axios.get("http://localhost:3000/api/v1/county", { headers });
    // }
    // const res = fetchData();
    //
    // console.log(res);

    axios
      .get(
        "http://ec2-3-93-193-224.compute-1.amazonaws.com/api/v1/prevalence",
        { headers },
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleClick = (id) => {
    nav("/counties/" + id);
  };

  return (
    <div className="container">
      <div style={{ padding: "20px" }}>
        <h1>Counties</h1>
      </div>
      <Row>
        {currentItems.map((item, index) => (
          <Col key={index} className="d-flex justify-content-center">
            <Card
              style={{ width: "20rem" }}
              onClick={() => handleClick(item.id)}
            >
              <Card.Img src={item.imageUrl} width="200" height="200" />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>
                      County Seat: {item.countySeat}
                      <br />
                      Population: {item.population}
                      <br />
                    </ListGroupItem>
                    <ListGroupItem>
                      <strong>2021 cases:</strong>
                      <br />
                      &ensp; Chlamydia: {item.chlamydiaCases}
                      <br />
                      &ensp; Gonorrhea: {item.gonorrheaCases}
                      <br />
                      &ensp; Syphilis*: {item.pssCases}
                      <br />
                    </ListGroupItem>
                  </ListGroup>
                </Card.Text>
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
        Displaying: {indexOfFirstItem + 1} -{" "}
        {Math.min(indexOfLastItem, countyData.length)} out of{" "}
        {countyData.length}
      </div>
      <p style={{ position: "relative", bottom: "0px" }}>
        {" "}
        *This refers to Primary and Secondary Syphilis.
      </p>
    </div>
  );
};

export default Counties;
