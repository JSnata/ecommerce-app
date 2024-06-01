import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MainSection from '../../components/Sections/MainSection';
import useAuthContext from '../../hooks/useAuthContext';
import SecondaryButton from '../../ui/Buttons/SecondaryButton/SecondaryButton';

function MainPage() {
  const { user, authIsReady } = useAuthContext();

  return (
    <div className="main-container">
      <Container>
        <Row className="justify-content-center">
          <Col md={6} className="text-center">
            {authIsReady && user && (
              <>
                <h1>Welcome, {user.firstName}!</h1>
                <p>Thank you for visiting our website.</p>
              </>
            )}
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={6} className="text-center">
            {authIsReady && user && (
              <>
                <SecondaryButton to="/register" link="/register">
                  Register
                </SecondaryButton>
                <SecondaryButton to="/login" link="/login">
                  Login
                </SecondaryButton>
              </>
            )}
          </Col>
        </Row>
      </Container>
      <MainSection />
    </div>
  );
}

export default MainPage;
