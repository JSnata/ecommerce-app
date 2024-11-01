import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Cart3 } from 'react-bootstrap-icons';
import { Container, Navbar, Offcanvas, Nav } from 'react-bootstrap';
import useAuthContext from '../../hooks/useAuthContext';
import SecondaryButton from '../../ui/Buttons/SecondaryButton/SecondaryButton';
import NavBarProfile from '../NavBarProfile/NavBarProfile';
import SecondaryNavigation from './SecondaryNavigation';
import Logo from '../../ui/Logo/Logo';

function NavigationBar() {
  const { user } = useAuthContext();
  const location = useLocation();

  return (
    <Navbar expand="lg" className="bg-body-tertiary" sticky="top">
      <Container>
        <Logo />
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-$"lg"`} />

        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-$"lg"`}
          aria-labelledby={`offcanvasNavbarLabel-expand-$"lg"`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-$"lg"`}>Flower Shop</Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body>
            <SecondaryNavigation />

            <div className="d-flex gap-2 justify-content-center justify-content-lg-end">
              <Nav.Link as={Link} to="/order">
                <Cart3 size={25} />
              </Nav.Link>
              {!user && location.pathname !== '/register' && (
                <SecondaryButton to="/register" link="/register">
                  Register
                </SecondaryButton>
              )}
              {!user && location.pathname !== '/login' && (
                <SecondaryButton to="/login" link="/login">
                  Login
                </SecondaryButton>
              )}

              {user && <NavBarProfile />}
            </div>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
