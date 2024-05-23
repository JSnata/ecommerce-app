import React from 'react';
import { useLocation, NavLink } from 'react-router-dom'; // Импортируем useLocation
import { Badge, Container, Image, Nav, Navbar } from 'react-bootstrap';
import { Cart3 } from 'react-bootstrap-icons';
import styles from './NavigationBar.module.css';
import useAuthContext from '../../hooks/useAuthContext';
import SecondaryButton from '../../ui/Buttons/SecondaryButton/SecondaryButton';
import NavBarProfile from '../NavBarProfile/NavBarProfile';

function NavigationBar() {
  const { user } = useAuthContext();
  const location = useLocation();

  // const handleLogout = () => {
  //   dispatch({ type: 'LOGOUT', payload: null });
  //   localStorage.removeItem('token');
  //   toast('Logged out');
  // };

  return (
    <Navbar expand="lg" className="bg-body-tertiary" sticky="top">
      <Container>
        <NavLink to={location.pathname === '/' ? '' : '/'}>
          <Image src="./logo.png" className={`d-inline-block align-top ${styles.logo}`} alt="React Bootstrap logo" />
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center justify-content-lg-end">
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
          {user && (
            <>
              <Nav.Link href="#">
                <Cart3 size={25} />
                <Badge bg="secondary">0</Badge>
              </Nav.Link>
              <NavBarProfile />
              {/* <Button variant="dark" onClick={handleLogout}> */}
              {/*  Logout */}
              {/* </Button> */}
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
