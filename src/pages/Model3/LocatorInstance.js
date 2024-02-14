import React from "react";
import { useParams } from "react-router-dom";
import LocatorData from "./LocatorData.json";
import { Card, Container, Row, Col } from "react-bootstrap";

const LocatorInstance = () => {
  let { id } = useParams();
  var data = LocatorData.Locator.find((i) => i.id.toString() === id);

  return (
    <Container className="container" style={{ flexDirection: "column" }}>
      <Card className="Intro" style={{ marginBottom: "20px" }}>
        <Card.Header>{data.title}</Card.Header>
        <Card.Body>
          <Card.Text>Address: {data.Address}</Card.Text>
          <Card.Text>Website: {data.Website}</Card.Text>
          <Card.Text>{data.About}</Card.Text>
          <Card.Header>Insurance Offered:</Card.Header>
          <Card.Text>{data.Insurance}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LocatorInstance;
