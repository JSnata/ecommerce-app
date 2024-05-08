import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function NotFoundPage() {
  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <Row>
        <Col className="text-center">
          <h1>404 - Page Not Found</h1>
          <p>Oooops, the page does not exist.</p>
        </Col>
      </Row>
    </Container>
  );
}

export default NotFoundPage;
