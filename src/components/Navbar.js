import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFeather, faBell, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation

const NavigationBar = () => {
    const location = useLocation(); // Get the current location

    return (
        <Navbar expand="lg" className="navbar-light bg-white py-3">
            <div className="container">
                <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faFeather} className="text-primary me-2" />
                    AI WebCrawler
                </Navbar.Brand>
                <Nav className="mx-auto">
                    <Nav.Link as={Link} to="/" className={location.pathname === '/' ? 'active px-3' : 'px-3'}>Home</Nav.Link>
                    <Nav.Link as={Link} to="/services" className={location.pathname === '/services' ? 'active px-3' : 'px-3'}>Services</Nav.Link>
                    <Nav.Link as={Link} to="/settings" className={location.pathname === '/settings' ? 'active px-3' : 'px-3'}>Settings</Nav.Link>
                </Nav>
                <div className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faBell} className="me-4" />
                    <span className="me-2">Vishal Vijayakumar</span>
                    <FontAwesomeIcon icon={faSignOutAlt} />
                </div>
            </div>
        </Navbar>
    );
};

export default NavigationBar;