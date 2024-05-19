import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import SecondaryButton from '../../ui/Buttons/SecondaryButton/SecondaryButton';

function NavigationBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary" sticky="top">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
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
