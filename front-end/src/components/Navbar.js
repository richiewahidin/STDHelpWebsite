import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import logo from '../images/stdhelplogo.png';

function NB() {
  return (
    <Navbar expand="lg" style={{ paddingTop: '0', paddingBottom: '0'}}>
      <Container className = "justify-content-center">
        <Navbar.Brand href="">
          <img
            src={logo}
            height="40"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link as={Link} to="/" style={{ fontSize: '30px' }}>Home</Nav.Link>
            <Nav.Link as={Link} to="/about" style={{ fontSize: '30px' }}>About</Nav.Link>
            <Nav.Link as={Link} to="/counties" style={{ fontSize: '30px' }}>Counties</Nav.Link>
            <Nav.Link as={Link} to="/locator" style={{ fontSize: '30px' }}>Locator</Nav.Link>
            <Nav.Link as={Link} to="/prevalence" style={{ fontSize: '30px' }}>Prevalence</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NB;
