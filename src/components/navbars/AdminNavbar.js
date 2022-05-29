import React, { useContext } from 'react'
import { Navbar, Container, Offcanvas, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthCon from '../../context/Auth';
import { useNavigate } from 'react-router-dom';
import EvonLogo from '../../images/logo-liggende.png';
import Header from '../text/Heading';

function AdminNavbar() {

    const [authState, setAuthState] = useContext(AuthCon);

    const navigate = useNavigate();

    function LogOut() {
        setAuthState(null);
        navigate("/");
    }

    return (
        <Navbar variant='dark' className='admin-nav'>
            <Container>
                <Link className='nav-logo' to="/">
                <img
                    src={EvonLogo}
                    width="200"
                    className="d-inline-block align-top"
                    alt=""
                />
                </Link>
                {authState ? (
                        <Navbar.Text>
                            Heisann: {authState.user_nicename} | <span className="logout-btn" onClick={LogOut}>Logg ut</span>
                        </Navbar.Text>
                    ) : (
                        navigate("/")
                    )
                }
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Navbar.Offcanvas
                        id="offcanvasNavbar"
                        aria-labelledby="offcanvasNavbarLabel"
                        placement="start"
                    >
                        <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvasNavbarLabel"><Header title='ADMIN MENY' /></Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav  className="me-auto justify-content-end flex-grow-1 pe-3">
                                <Link className='nav-link' to="/admin/produkter">Produkter</Link>
                                <Link className='nav-link' to="/admin/legg-til-produkt">Legg til produkt</Link>
                                <Link className='nav-link' to="/admin/henvendelser">Meldinger</Link>
                                <Link className='nav-link' to="/admin/feedback">Feedback</Link>
                                {authState ? (
                                        <Navbar.Text>
                                            Heisann: {authState.user_nicename} | <span className="logout-btn" onClick={LogOut}>Logg ut</span>
                                        </Navbar.Text>
                                    ) : (
                                        navigate("/")
                                    )
                                }
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Navbar.Collapse>
            </Container>
            
        </Navbar>
    )
}

export default AdminNavbar;