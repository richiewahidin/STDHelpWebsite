import React from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";

const CountiesCard = ({ item, onClick, searchTerm }) => {
  // Function to highlight the matched search term
  const highlightMatch = (text) => {
    if (!searchTerm) return text;

    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
  };

  return (
    <Card style={{ width: "20rem" }} onClick={onClick}>
      <Card.Img
        src={item.imgurl}
        style={{ width: "100%", height: "200px", objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title>
          {/* Highlight the county name */}
          <span
            dangerouslySetInnerHTML={{ __html: highlightMatch(item.name) }}
          />
        </Card.Title>
        <Card.Text>
          <ListGroup className="list-group-flush">
            <ListGroupItem>
              {/* Highlight the population */}
              Population: {item.population}
              <br />
            </ListGroupItem>
            <ListGroupItem>
              <strong>2021 cases:</strong>
              <br />
              {/* Add more fields to highlight if needed */}
              &ensp; Chlamydia: {item.ccases}
              <br />
              &ensp; Gonorrhea: {item.gcases}
              <br />
              &ensp; Syphilis*: {item.scases}
              <br />
            </ListGroupItem>
          </ListGroup>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CountiesCard;
