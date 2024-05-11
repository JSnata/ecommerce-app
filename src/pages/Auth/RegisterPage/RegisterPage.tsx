import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Eye, EyeSlashFill } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import styles from './RegisterPage.module.css';

function RegisterPage() {
  const [showPass, setShowPass] = useState(false);
  const clickHandler = () => {
    setShowPass((prev) => !prev);
  };

  return (
    <div className={styles.formWrapper}>
      <h1>Register </h1>
      <Form noValidate>
        <Row>
          <Col xs={10} md={6} className={styles.column}>
            <Form.Group className="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" name="email" />
            </Form.Group>
            <Form.Group className="text">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" />
            </Form.Group>
            <Form.Group className="date">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control type="date" name="date" />
            </Form.Group>
          </Col>
          <Col xs={10} md={6} className={styles.column}>
            <Form.Group className="password">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <Form.Control type={showPass ? 'text' : 'password'} name="password" />
                <InputGroup.Text onClick={clickHandler}>{showPass ? <Eye /> : <EyeSlashFill />}</InputGroup.Text>´
              </InputGroup>
            </Form.Group>
            <Form.Group className="text">
              <Form.Label>Surname</Form.Label>
              <Form.Control type="text" name="surname" />
            </Form.Group>
          </Col>
        </Row>
        <hr className={styles.line} />
        <Row>
          <Col xs={10} md={6} className={styles.column}>
            <Form.Group className="country">
              <Form.Label>Country</Form.Label>
              <Form.Control type="text" name="country" />
            </Form.Group>
            <Form.Group className="street">
              <Form.Label>Street</Form.Label>
              <Form.Control type="text" name="street" />
            </Form.Group>
          </Col>
          <Col xs={10} md={6} className={styles.column}>
            <Form.Group className="city">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" name="city" />
            </Form.Group>
            <Form.Group className="code">
              <Form.Label>Postal code</Form.Label>
              <Form.Control type="text" name="code" />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="dark" type="submit">
          Continue
        </Button>
      </Form>
    </div>
  );
}

export default RegisterPage;
