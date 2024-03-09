import React from "react";
import { useParams } from "react-router-dom";
import LocatorData from "./LocatorData.json";
import { useLocation } from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";

const LocatorInstance = () => {
  const location = useLocation();
  const { name, address, website, phonenumber} = location.state;

  const locatorInstance = {
    name: name,
    address: address,
    website: website,
    phonenumber: phonenumber,
  };

  return (
    <Container className="container" style={{ flexDirection: "column" }}>
      <Card className="Intro" style={{ marginBottom: "20px" }}>
        <Card.Header>{name}</Card.Header>
        <Card.Body>
          <Card.Text>Address: {address}</Card.Text>
          <Card.Text>Website: {website}</Card.Text>
          <Card.Text>Phone Number: {phonenumber}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LocatorInstance;
