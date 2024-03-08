import React from "react";
import { Card, Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const InstancePrevalence = () => {
  const location = useLocation();
  const { year, disease, sex, cases, rate } = location.state;

  // Create a prevalence instance
  const prevalenceInstance = {
    year: year,
    disease: disease,
    sex: sex,
    cases: cases,
    rate: rate
  };

  // Display the prevalence instance
  return (
    <Container className="container" style={{ flexDirection: "column" }}>
      <Card className="Intro" style={{ marginBottom: "20px" }}>
        <Card.Header>Prevalence</Card.Header>
        <Card.Body>
          <Card.Title>{prevalenceInstance.year}</Card.Title>
          <Card.Text>Disease: {disease}</Card.Text>
          <Card.Text>Sex: {sex}</Card.Text>
          <Card.Text>Cases: {cases}</Card.Text>
          <Card.Text>Rate: {rate}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default InstancePrevalence;