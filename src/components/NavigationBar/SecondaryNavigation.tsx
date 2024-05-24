import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

function SecondaryNavigation() {
  return (
    <Nav className="mr-auto">
      <Nav.Link as={NavLink} to="/catalog">
        Catalog
      </Nav.Link>
      <Nav.Link as={NavLink} to="/about">
        About page
      </Nav.Link>
      {/* <Nav.Link as={NavLink} to="/shoppingcart">
        Shopping cart
      </Nav.Link> */}
    </Nav>
  );
}

export default SecondaryNavigation;
