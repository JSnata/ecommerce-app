import React from 'react';
import Form from 'react-bootstrap/Form';

function LoginForm() {
  return (
    <Form>
      <Form.Group className="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="name@example.com" />
      </Form.Group>
      <Form.Group className="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" />
      </Form.Group>
    </Form>
  );
}

export default LoginForm;
