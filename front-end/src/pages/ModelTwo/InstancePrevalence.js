import React from "react";
import { Card, Container, Image, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const InstancePrevalence = () => {
  const location = useLocation();
  const {
    id,
    countyid,
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
  } = location.state;

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header as="h5">Prevalence Details</Card.Header>
        <Card.Body>
          <Image
            src={countyimage}
            alt="County Image"
            rounded
            className="mb-3"
            style={{ maxWidth: "100%", height: "auto" }}
          />
          <Row className="mb-3">
            <Col md={4}><strong>Year:</strong> {year}</Col>
            <Col md={4}><strong>Sex:</strong> {sex}</Col>
            <Col md={4}><strong>Population:</strong> {population}</Col>
          </Row>
          <Row className="mb-3">
            <Col md={4}><strong>Chlamydia cases:</strong> {c_cases} ({c_rate} per 100,000)</Col>
            <Col md={4}><strong>Syphilis cases:</strong> {s_cases} ({s_rate} per 100,000)</Col>
            <Col md={4}><strong>Gonorrhea cases:</strong> {g_cases} ({g_rate} per 100,000)</Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default InstancePrevalence;
