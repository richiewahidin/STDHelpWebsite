import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Container from "react-bootstrap/Container";
import "./DropDown.css";

const CustomDropdown = ({ title, items, setter, scroll }) => {
  console.log(setter); // Add this line to check what setter is

  const [selectedOption, setSelectedOption] = useState(title);

  function handleClick(value) {
    setSelectedOption(value);
    if (typeof setter === "function") {
      setter(value);
    } else {
      console.error("Setter is not a function", setter);
    }
  }

  return (
    <DropdownButton
      id="dropdown-basic-button"
      className="dropdown-button"
      title={selectedOption}
    >
      <Container className="dropdown-menu-container" style={{ maxHeight: '200px', overflowY: 'auto' }}>
        {items.map((item, index) => (
          <Dropdown.Item key={index} onClick={() => handleClick(item)}>
            {item}
          </Dropdown.Item>
        ))}
      </Container>
    </DropdownButton>
  );
};

export default CustomDropdown;