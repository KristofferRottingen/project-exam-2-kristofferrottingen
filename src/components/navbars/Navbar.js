import React, { useContext } from 'react';
import { Navbar, Nav, Container, Offcanvas } from 'react-bootstrap';
import EvonLogo from '../../images/logo-liggende.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import AuthCon from '../../context/Auth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Search from './Search';
import OffCanSearch from './OffCanSearch';

function Navs() {

  const [authState, setAuthState] = useContext(AuthCon);

  const navigate = useNavigate();

  function LogOut() {
    setAuthState(null);
    navigate("/");
  }

  return (
    <Navbar variant='dark'  expand="lg">
      <Navbar.Collapse className="upper-nav justify-content-end">
        {authState ? (
          <Navbar.Text>
            Heisann: {authState.user_nicename} | <Link to="/admin">Admin</Link> | <a onClick={LogOut}>Logg ut</a> 
          </Navbar.Text>) : 
          (
            <Navbar.Text>
              Velkommen! <Link to='/login'>Logg inn</Link>
            </Navbar.Text>
          )
        }
      </Navbar.Collapse>
      <Container>
        <Link className='nav-logo' to="/">
          <img
            src={EvonLogo}
            width="200"
            className="d-inline-block align-top"
            alt=""
          />
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse bg="dark" id="basic-navbar-nav">
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">Meny</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
            <Nav className="me-auto justify-content-end flex-grow-1 pe-3">
              <OffCanSearch />
              <Link className='nav-link' to="/">Hjem</Link>
              <Link className='nav-link' to="/produkter">Produkter</Link>
              <Link className='nav-link' to="/kontakt">Kontakt oss</Link>
              <Link className='nav-link' to='/cart'>
                <FontAwesomeIcon className='icons' icon={faCartShopping}/>
              </Link>
              {authState ? (
                <Navbar.Text>
                  Heisann: {authState.user_nicename} | <Link to="/admin">Admin</Link> <a onClick={LogOut}>Logg ut</a> 
                </Navbar.Text>) : 
                (
                  <Navbar.Text>
                    Velkommen! <Link to='/login'>Logg inn</Link>
                  </Navbar.Text>
                )
              }
            </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Navbar.Collapse>
        <Nav className="web-nav">
          <Link className='nav-link' to="/">Hjem</Link>
          <Link className='nav-link' to="/produkter">Produkter</Link>
          <Link className='nav-link' to="/kontakt">Kontakt oss</Link>
          <Search />
          <Link className='nav-link' to='/cart'>
            <FontAwesomeIcon className='icons' icon={faCartShopping}/>
          </Link>
        </Nav>  
      </Container>
    </Navbar>
  )
}

export default Navs;