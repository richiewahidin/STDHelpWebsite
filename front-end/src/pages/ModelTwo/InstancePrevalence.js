import React, { useState, useEffect } from "react";
import { Card, Container, Image, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import axios from "axios";

const InstancePrevalence = () => {
  const location = useLocation();
  const {
    // id,
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
    countyName,
  } = location.state;

  // Calculate the maximum value for scaling the chart
  const maxCases = Math.max(c_cases, s_cases, g_cases);

  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://d1ahbxgizovdow.cloudfront.net/county/${countyid}`
        );
        setData(response.data.rows); // Update state with fetched data rows
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
                <strong>Description:</strong> The{" "}
                {sex === "Total" ? "Male and Female" : sex} population in{" "}
                {countyName} during the year {year} was {population}. Below
                shows the number of Chlamydia, Syphilis, and Gonorrhea cases
                for {sex === "Total" ? "Males and Female" : sex}s during this time.
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <Row>
                <Col md={4}>
                  <Card>
                    <Card.Body>
                      <strong>Chlamydia cases:</strong>
                      <br />
                      {c_cases} ({c_rate} cases per 100,000 people)
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card>
                    <Card.Body>
                      <strong>Syphilis cases:</strong>
                      <br />
                      {s_cases} ({s_rate} cases per 100,000 people)
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card>
                    <Card.Body>
                      <strong>Gonorrhea cases:</strong>
                      <br />
                      {g_cases} ({g_rate} cases per 100,000 people)
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
              height: "300px",
              margin: "20px 0",
            }}
          >
            <div
              style={{
                width: "100px",
                height: `${(c_cases / maxCases) * 100}%`,
                backgroundColor: "blue",
                margin: "0 10px",
              }}
            ></div>
            <div
              style={{
                width: "100px",
                height: `${(s_cases / maxCases) * 100}%`,
                backgroundColor: "red",
                margin: "0 10px",
              }}
            ></div>
            <div
              style={{
                width: "100px",
                height: `${(g_cases / maxCases) * 100}%`,
                backgroundColor: "green",
                margin: "0 10px",
              }}
            ></div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
              height: "30px",
              margin: "20px 0",
            }}
          >
            <div style={{ width: "100px" }}>
              Chlamydia
              <br />
              {c_cases}
            </div>
            <div style={{ width: "145px" }}>
              Syphilis
              <br />
              {s_cases}
            </div>
            <div style={{ width: "100px" }}>
              Gonorrhea
              <br />
              {g_cases}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
              height: "50px",
              margin: "20px 0",
            }}
          >
            <h5>Related Content</h5>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default InstancePrevalence;
