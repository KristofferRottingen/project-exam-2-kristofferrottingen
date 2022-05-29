import React from 'react';
import { Navbar, Nav} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../text/Heading';
 
function AdminMenu() {
  return (
    <div className='admin-menu'>
        <Navbar  expand="lg">
            <Nav className="me-auto admin-menu-nav">
                <Header title='ADMIN MENY' />
                <Link className='nav-link' to="/admin/produkter">Produkter</Link>
                <Link className='nav-link' to="/admin/legg-til-produkt">Legg til produkt</Link>
                <Link className='nav-link' to="/admin/henvendelser">Meldinger</Link>
                <Link className='nav-link' to="/admin/feedback">Feedback</Link>
            </Nav>  
        </Navbar>
    </div>
  )
}

export default AdminMenu;