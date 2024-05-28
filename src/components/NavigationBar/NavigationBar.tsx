/* eslint-disable */

// import React from 'react';
// import { useLocation, NavLink } from 'react-router-dom'; // Импортируем useLocation
// import { Col, Container, Image, Navbar, Row } from 'react-bootstrap';
// import Button from 'react-bootstrap/Button';
// import { toast } from 'react-toastify';
// import styles from './NavigationBar.module.css';
// import useAuthContext from '../../hooks/useAuthContext';
// import SecondaryButton from '../../ui/Buttons/SecondaryButton/SecondaryButton';
// import SecondaryNavigation from './SecondaryNavigation';

// function NavigationBar() {
//   const { user, dispatch } = useAuthContext();
//   const location = useLocation();

//   const handleLogout = () => {
//     dispatch({ type: 'LOGOUT', payload: null });
//     localStorage.removeItem('token');
//     toast('Logged out');
//   };

//   return (
//     <Navbar expand="lg" className="bg-body-tertiary" sticky="top">
//       <Container>
//         <Row className="flex-grow-1 justify-content-between align-items-center">
//           <Col>
//             <NavLink to={location.pathname === '/' ? '' : '/'}>
//               <Image
//                 src="./logo.png"
//                 className={`d-inline-block align-top ${styles.logo}`}
//                 alt="React Bootstrap logo"
//               />
//             </NavLink>
//           </Col>
//           <Col>
//             <SecondaryNavigation />
//           </Col>
//           <Col>
//             <Navbar.Toggle aria-controls="basic-navbar-nav" />
//             <Navbar.Collapse id="basic-navbar-nav" className="gap-2 justify-content-center justify-content-lg-end">
//               {!user && location.pathname !== '/register' && (
//                 <SecondaryButton to="/register" link="/register">
//                   Register
//                 </SecondaryButton>
//               )}
//               {!user && location.pathname !== '/login' && (
//                 <SecondaryButton to="/login" link="/login">
//                   Login
//                 </SecondaryButton>
//               )}
//               {user && (
//                 <Button variant="dark" onClick={handleLogout}>
//                   Logout
//                 </Button>
//               )}
//             </Navbar.Collapse>
//           </Col>
//         </Row>
//       </Container>
//     </Navbar>
//   );
// }

// export default NavigationBar;

import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

import React from 'react';
import { useLocation, NavLink } from 'react-router-dom'; // Импортируем useLocation
import { Col, Container, Image, Navbar, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import styles from './NavigationBar.module.css';
import useAuthContext from '../../hooks/useAuthContext';
import SecondaryButton from '../../ui/Buttons/SecondaryButton/SecondaryButton';
import SecondaryNavigation from './SecondaryNavigation';

function NavigationBar() {
  const { user, dispatch } = useAuthContext();
  const location = useLocation();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT', payload: null });
    localStorage.removeItem('token');
    toast('Logged out');
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary" sticky="top">
      <Container>
        <Navbar.Brand href={location.pathname === '/' ? '' : '/'}>
          <Image src="./logo.png" className={`d-inline-block align-top ${styles.logo}`} alt="React Bootstrap logo" />
        </Navbar.Brand>

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
            </div>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
