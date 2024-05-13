import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Eye, EyeSlashFill } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import { Formik } from 'formik';
import * as yup from 'yup';
import styles from './RegisterPage.module.css';

function RegisterPage() {
  const [showPass, setShowPass] = useState(false);
  const clickHandler = () => {
    setShowPass((prev) => !prev);
  };

  const handleSubmitForm = () => {
    console.log(1);
  };

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required('This field is required!')
      .email('Invalid email')
      .matches(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Email must be xxx@xxx.xx'),
    password: yup
      .string()
      .required('This field is required!')
      .min(8, 'Password must be at least 8 characters')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[0-9]/, 'Password must contain at least one digit'),
    name: yup
      .string()
      .required('This field is required!')
      .min(1, 'The name must contain at least 1 character')
      .matches(/^[^0-9]*$/, 'Field must not contain numbers')
      .matches(/^[a-zA-Z]+$/, 'Field must not contain special characters'),
    surname: yup
      .string()
      .required('This field is required!')
      .min(1, 'The name must contain at least 1 character')
      .matches(/^[^0-9]*$/, 'Field must not contain numbers')
      .matches(/^[a-zA-Z]+$/, 'Field must not contain special characters'),
    date: yup
      .date()
      .required('This field is required!')
      .max(new Date(new Date().setFullYear(new Date().getFullYear() - 14)), 'You must be at least 14 years old')
      .test('check-age', 'You must be at least 14 years old', function (value) {
        const cutoffDate = new Date(new Date().setFullYear(new Date().getFullYear() - 14));
        return new Date(value) <= cutoffDate;
      }),
    street: yup.string().required('This field is required!').min(1, 'Must contain at least 1 character'),
    city: yup
      .string()
      .required('This field is required!')
      .min(1, 'Must contain at least 1 character')
      .matches(/^[^0-9]*$/, 'Field must not contain numbers')
      .matches(/^[a-zA-Z]+$/, 'Field must not contain special characters'),
    country: yup.string().required('This field is required!'),
    code: yup.string().required('This field is required!'),
  });

  return (
    <div className={styles.formWrapper}>
      <h1>Register </h1>
      <Formik
        validationSchema={validationSchema}
        onSubmit={handleSubmitForm}
        initialValues={{
          email: '',
          password: '',
          name: '',
          surname: '',
          date: '',
          country: '',
          city: '',
          street: '',
          code: '',
        }}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Row>
              <Col xs={10} md={6} className={styles.column}>
                <Form.Group className="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={touched.email && !!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="text">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    isInvalid={touched.name && !!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="date">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={values.date}
                    onChange={handleChange}
                    isInvalid={touched.date && !!errors.date}
                    max={new Date(new Date().setFullYear(new Date().getFullYear() - 14)).toISOString().split('T')[0]}
                  />
                  <Form.Control.Feedback type="invalid">{errors.date}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col xs={10} md={6} className={styles.column}>
                <Form.Group className="password">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPass ? 'text' : 'password'}
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      isInvalid={touched.password && !!errors.password}
                    />
                    <InputGroup.Text onClick={clickHandler}>{showPass ? <Eye /> : <EyeSlashFill />}</InputGroup.Text>
                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                <Form.Group className="text">
                  <Form.Label>Surname</Form.Label>
                  <Form.Control
                    type="text"
                    name="surname"
                    value={values.surname}
                    onChange={handleChange}
                    isInvalid={touched.surname && !!errors.surname}
                  />
                  <Form.Control.Feedback type="invalid">{errors.surname}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={10} md={12} className={styles.column}>
                <hr className={styles.line} />
              </Col>
            </Row>
            <Row>
              <Col xs={10} md={6} className={styles.column}>
                <Form.Group className="country">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    name="country"
                    value={values.country}
                    onChange={handleChange}
                    isInvalid={touched.country && !!errors.country}
                  />
                  <Form.Control.Feedback type="invalid">{errors.country}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="street">
                  <Form.Label>Street</Form.Label>
                  <Form.Control
                    type="text"
                    name="street"
                    value={values.street}
                    onChange={handleChange}
                    isInvalid={touched.street && !!errors.street}
                  />
                  <Form.Control.Feedback type="invalid">{errors.street}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col xs={10} md={6} className={styles.column}>
                <Form.Group className="city">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    value={values.city}
                    onChange={handleChange}
                    isInvalid={touched.city && !!errors.city}
                  />
                  <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="code">
                  <Form.Label>Postal code</Form.Label>
                  <Form.Control
                    type="text"
                    name="code"
                    value={values.code}
                    onChange={handleChange}
                    isInvalid={touched.code && !!errors.code}
                  />
                  <Form.Control.Feedback type="invalid">{errors.code}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={10} md={12} className={styles.column}>
                <Button variant="dark" type="submit" className={styles.submitBtn}>
                  Continue
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default RegisterPage;
