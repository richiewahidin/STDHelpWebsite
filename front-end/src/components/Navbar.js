import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import logo from '../images/stdhelplogo.png';

function NB() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary" style={{ paddingTop: '0', paddingBottom: '0'}}>
      <Container>
        <Navbar.Brand href="">
          <img
            src={logo}
            height="40"
          />
          STDHelp
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/counties">Counties</Nav.Link>
            <Nav.Link as={Link} to="/locator">Locator</Nav.Link>
            <Nav.Link as={Link} to="/prevalence">Prevalence</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NB;
