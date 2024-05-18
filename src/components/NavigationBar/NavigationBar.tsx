import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import SecondaryButton from '../../ui/Buttons/SecondaryButton';
import styles from './NavigationBar.module.css';

function NavigationBar() {
  // console.log(createCustomer({ email: 'HHHHH', password: 'HHHHH', firstName: 'HHHH', lastName: 'HHHH' }));
  // console.log(getStoreData());
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">
          <img src="./logo.png" className={`d-inline-block align-top ${styles.logo}`} alt="React Bootstrap logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center justify-content-lg-end">
          <SecondaryButton to="/login" link="/login">
            Login
          </SecondaryButton>
          <SecondaryButton to="/register" link="/register">
            Sign up
          </SecondaryButton>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
