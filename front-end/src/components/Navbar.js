import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/stdhelplogo.png';

function NB({setSearchQuery}) {

  const navigate = useNavigate();

  const handleSearch = (e) => {
    const query = e.target.value;
    if (query === "" && e.key === 'Enter') {
      navigate('/');
    }
    if (e.key === 'Enter' && query !== "") {
      navigate(`/search/${query}`);
    }
  };

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
          <div>
            <input type="text" placeholder="Search..." onKeyDown={handleSearch} />
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NB;
