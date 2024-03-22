import React from "react";
import { Card, Container, Image, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const InstancePrevalence = () => {
  const location = useLocation();
  const {
    // id,
    // countyid,
    year,
    sex,
    population,
    c_cases,
    c_rate,
    s_cases,
    s_rate,
    g_cases,
    g_rate,
    countyimage,
    countyName,
  } = location.state;

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header as="h5">
          <b>
            {countyName} {year}
          </b>
        </Card.Header>
        <Card.Body>
          <Image
            src={countyimage}
            alt="County Image"
            className="mb-3"
            style={{ maxWidth: "80%", height: "500px" }}
          />
          <Row className="mb-3">
            <Col>
              <div className="border p-3 mb-3">
                <strong>Description:</strong> The {sex === "Total" ? "Male and Female" : sex} population in {countyName} during the year {year} was {population}. Below details the number of Chlamydia, Syphilis, and Gonorrhea cases for {sex} during this time.
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <Row>
                <Col md={4}>
                  <Card>
                    <Card.Body>
                      <strong>Chlamydia cases:</strong><br />
                      {c_cases} ({c_rate} cases per 100,000 people)
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card>
                    <Card.Body>
                      <strong>Syphilis cases:</strong><br />
                      {s_cases} ({s_rate} cases per 100,000 people)
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card>
                    <Card.Body>
                      <strong>Gonorrhea cases:</strong><br />
                      {g_cases} ({g_rate} cases per 100,000 people)
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default InstancePrevalence;