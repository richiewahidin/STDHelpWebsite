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
        <Card.Header>Locator</Card.Header>
        <Card.Body>
          <Card.Title>{data.title}</Card.Title>
          <Card.Text>Address: {data.Address}</Card.Text>
          <div style={{ marginBottom: '20px', clear: 'both' }}>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.4528962227237!2d-118.36266148947381!3d34.05790267304292!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2b917b7b6a9ef%3A0x94c5954599f53e26!2s5901%20W%20Olympic%20Blvd%2C%20Los%20Angeles%2C%20CA%2090036!5e0!3m2!1sen!2sus!4v1707941518189!5m2!1sen!2sus" width="400" height="300" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
          <Card.Text>{data.About}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LocatorInstance;
