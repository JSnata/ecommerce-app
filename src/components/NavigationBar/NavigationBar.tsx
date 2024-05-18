import React from 'react';
import { useLocation } from 'react-router-dom'; // Импортируем useLocation
import { Container, Navbar } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import SecondaryButton from '../../ui/Buttons/SecondaryButton';
import styles from './NavigationBar.module.css';
import useAuthContext from '../../hooks/useAuthContext';

function NavigationBar() {
  const { user, dispatch } = useAuthContext();
  const location = useLocation();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('token');
    toast('Logged out');
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href={location.pathname === '/' ? '' : '/'}>
          <img src="./logo.png" className={`d-inline-block align-top ${styles.logo}`} alt="React Bootstrap logo" />
        </Navbar.Brand>
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
            <Button variant="dark" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
