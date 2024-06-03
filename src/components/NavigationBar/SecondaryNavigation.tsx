import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

function SecondaryNavigation() {
  return (
    <Nav className="justify-content-end flex-grow-1 pe-3">
      <Nav.Link as={NavLink} to="/catalog">
        Catalog
      </Nav.Link>
      <Nav.Link as={NavLink} to="/about">
        About page
      </Nav.Link>
    </Nav>
  );
}

export default SecondaryNavigation;
