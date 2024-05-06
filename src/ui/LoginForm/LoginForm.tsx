import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styles from './LoginForm.module.css';

function LoginForm() {
  return (
    <div className={styles.formWrapper}>
      <h1>Sign up</h1>
      <Form className={styles.form}>
        <Form.Group className="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="name@example.com" />
        </Form.Group>
        <Form.Group className="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" />
        </Form.Group>
        <Button variant="dark">Dark</Button>
      </Form>
    </div>
  );
}

export default LoginForm;
