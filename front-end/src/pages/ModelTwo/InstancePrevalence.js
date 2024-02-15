import React from "react";
import { useParams } from "react-router-dom";
import PrevalenceData from "./PrevalenceData.json";
import { Card, Container, Row, Col } from "react-bootstrap";

const InstancePrevalence = () => {
  let { id } = useParams();
  var data = PrevalenceData.prevalence.find((i) => i.id.toString() === id);

  return (
    <Container className="container" style={{ flexDirection: "column" }}>
      <Card className="Intro" style={{ marginBottom: "20px" }}>
        <Card.Header>Prevalence</Card.Header>
        <Card.Body>
          <Card.Title>{data.title}</Card.Title>
          <Card.Text>Population: {data.population}</Card.Text>
        </Card.Body>
      </Card>
      {/* Row */}
      <Row>
        {/* Chlamydia */}
        <Col>
          <Card>
            <Card.Header>
              <strong>Chlamydia</strong>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                <strong>Total Cases: </strong>
                {data.chlamydia_cases}
              </Card.Text>
              <Card.Text>
                <strong>Rate: </strong>
                {data.chlamydia_rate}
              </Card.Text>
              <Card.Text>
                <strong>% Tested for Chlamydia: </strong>
                {data.chlamydia}
              </Card.Text>
              <a
                href="https://www.cdc.gov/std/chlamydia/stdfact-chlamydia-detailed.htm"
                target="_blank"
                rel="noopener noreferrer"
              >
                What is Chlamydia?
              </a>
            </Card.Body>
          </Card>
        </Col>
        {/* Gonorrhea */}
        <Col>
          <Card>
            <Card.Header>
              <strong>Gonorrhea</strong>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                <strong>Total Cases: </strong>
                {data.gonorrhea_cases}
              </Card.Text>
              <Card.Text>
                <strong>Rate: </strong>
                {data.gonorrhea_rate}
              </Card.Text>
              <Card.Text>
                <strong>% Tested for Gonorrhea: </strong>
                {data.gonorrhea}
              </Card.Text>
              <Card.Text></Card.Text>
              <a
                href="https://www.cdc.gov/std/gonorrhea/stdfact-gonorrhea-detailed.htm"
                target="_blank"
                rel="noopener noreferrer"
              >
                What is Gonorrhea?
              </a>
            </Card.Body>
          </Card>
        </Col>
        {/* Syphilis */}
        <Col>
          <Card>
            <Card.Header>
              <strong>Syphilis</strong>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                <strong>Total Cases: </strong>
                {data.early_syphilis_cases}
              </Card.Text>
              <Card.Text>
                <strong>Rate: </strong>
                {data.early_syphilis_rate}
              </Card.Text>
              <Card.Text>
                <strong>% Tested for Syphilis: </strong>
                {data.syphilis}
              </Card.Text>
              <a
                href="https://www.cdc.gov/std/syphilis/stdfact-syphilis-detailed.htm"
                target="_blank"
                rel="noopener noreferrer"
              >
                What is Syphilis?
              </a>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <img
        src={data.image}
        alt="Description of the image"
        style={{ width: "100%", marginTop: "20px" }}
      />
      <Card className="Related" style={{ marginBottom: "20px" }}>
        <Card.Header>Related Content</Card.Header>
        <Card.Body>
          <Row>
            <Col>
              <Card.Header>{data.related_counties_1}</Card.Header>
              <Card.Body>
                <a href={data.related_link_1} rel="noopener noreferrer">Learn More</a>
              </Card.Body>
            </Col>
            <Col>
              <Card.Header>{data.related_counties_2}</Card.Header>
              <Card.Body>
                <a href={data.related_link_2} rel="noopener noreferrer">Learn More</a>
              </Card.Body>
            </Col>
            <Col>
              <Card.Header>{data.related_counties_3}</Card.Header>
              <Card.Body>
                <a href={data.related_link_3} rel="noopener noreferrer">Learn More</a>
              </Card.Body>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default InstancePrevalence;
