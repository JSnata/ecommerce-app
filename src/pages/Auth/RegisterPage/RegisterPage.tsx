import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Eye, EyeSlashFill } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import { Formik } from 'formik';
import * as yup from 'yup';
import ApiService from '../../../API/apiService';
import { ICustomerCreateData } from '../../../types/CustomerTypes';
import { Country } from '../../../types/enumCounty';
import styles from './RegisterPage.module.css';

type FormValues = Record<string, string>;

function RegisterPage() {
  const [showPass, setShowPass] = useState(false);
  const clickHandler = () => {
    setShowPass((prev) => !prev);
  };

  const handleSubmitForm = (values: FormValues) => {
    let country: Country;

    switch (values.country) {
      case 'Belarus':
        country = Country.Belarus;
        break;
      case 'Russia':
        country = Country.RussianFederation;
        break;
      case 'Poland':
        country = Country.Poland;
        break;
      default:
        country = Country.RussianFederation; // По умолчанию выбрана Россия
        break;
    }

    const registerValues: ICustomerCreateData = {
      email: values.email,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName,
      dateOfBirth: values.dateOfBirth,
      addresses: [
        {
          street: values.street,
          city: values.city,
          postalCode: values.code,
          country,
        },
      ],
      defaultShippingAddress: 0,
      shippingAddresses: [0],
      defaultBillingAddress: 0,
      billingAddresses: [0],
    };
    console.log(registerValues);
    ApiService.register(registerValues).then((response) => {
      console.log(response);
    });
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
    firstName: yup
      .string()
      .required('This field is required!')
      .min(1, 'The first name must contain at least 1 character')
      .matches(/^[^0-9]*$/, 'Field must not contain numbers')
      .matches(/^[^!@#$%^&-+=№;:")(]*$/, 'Field must not contain special characters'),
    lastName: yup
      .string()
      .required('This field is required!')
      .min(1, 'The surname must contain at least 1 character')
      .matches(/^[^0-9]*$/, 'Field must not contain numbers')
      .matches(/^[^!@#$%^&-+=№;:")(]*$/, 'Field must not contain special characters'),
    dateOfBirth: yup
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
      .matches(/^[^!@#$%^&-+=№;:")(]*$/, 'Field must not contain special characters'),
    country: yup.string().required('This field is required!'),
    code: yup
      .string()
      .required('This field is required!')
      .test('custom-validation', 'Wrong format', (value, context) => {
        switch (context.parent.country) {
          case '1':
            return /^(2[1-4]{1}[0-7]{1}[0-9]{3})$/.test(value);
          case '2':
            return /^([1-6]{1}[0-9]{5})$/.test(value);
          case '3':
            return /^([0-9]{2}-[0-9]{3})$/.test(value);
          default:
            return false;
        }
      }),
  });

  return (
    <div className={styles.formWrapper}>
      <h1>Register</h1>
      <Formik
        validationSchema={validationSchema}
        onSubmit={handleSubmitForm}
        initialValues={{
          email: '',
          password: '',
          firstName: '',
          lastName: '',
          dateOfBirth: '',
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
                <Col xs={10} md={11} className={styles.column}>
                  <h4>Personal data</h4>
                </Col>
                <Col xs={10} md={11} className={styles.column}>
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
                </Col>
                <Col xs={10} md={11} className={styles.column}>
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
                </Col>
                <Col xs={10} md={11} className={styles.column}>
                  <Form.Group className="text">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      value={values.firstName}
                      onChange={handleChange}
                      isInvalid={touched.firstName && !!errors.firstName}
                    />
                    <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col xs={10} md={11} className={styles.column}>
                  <Form.Group className="text">
                    <Form.Label>Surname</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      value={values.lastName}
                      onChange={handleChange}
                      isInvalid={touched.lastName && !!errors.lastName}
                    />
                    <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col xs={10} md={11} className={styles.column}>
                  <Form.Group className="date">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                      type="date"
                      name="dateOfBirth"
                      value={values.dateOfBirth}
                      onChange={handleChange}
                      isInvalid={touched.dateOfBirth && !!errors.dateOfBirth}
                      max={new Date(new Date().setFullYear(new Date().getFullYear() - 14)).toISOString().split('T')[0]}
                    />
                    <Form.Control.Feedback type="invalid">{errors.dateOfBirth}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col xs={10} md={12} className={`${styles.column} ${styles.lineCol}`}>
                  <hr className={styles.line} />
                </Col>
              </Col>
              <Col xs={10} md={6} className={styles.column}>
                <Row>
                  <Col xs={10} md={12} className={styles.column}>
                    <h4 className={styles.billing}>Billing address</h4>
                  </Col>
                </Row>
                <Row>
                  <Col xs={10} md={6} className={styles.column}>
                    <Form.Group className="country">
                      <Form.Label>Country</Form.Label>
                      <Form.Control
                        as="select"
                        type="text"
                        name="country"
                        value={values.country}
                        onChange={handleChange}
                        isInvalid={touched.country && !!errors.country}
                      >
                        <option value="1">Russia</option>
                        <option value="2">Belarus</option>
                        <option value="3">Poland</option>
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">{errors.country}</Form.Control.Feedback>
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
                  </Col>
                </Row>
                <Row>
                  <Col xs={10} md={6} className={styles.column}>
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
                    <div key="default-checkbox">
                      <Form.Check type="checkbox" id="default-checkbox" label="Set as default billing address" />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col xs={10} md={12} className={styles.column}>
                    <hr className={styles.line} />
                  </Col>
                </Row>
                <Row>
                  <Col xs={10} md={12} className={styles.column}>
                    <h4>Delivery address</h4>
                  </Col>
                </Row>
                <Row>
                  <Col xs={10} md={6} className={styles.column}>
                    <Form.Group className="country">
                      <Form.Label>Country</Form.Label>
                      <Form.Control
                        as="select"
                        type="text"
                        name="country"
                        value={values.country}
                        onChange={handleChange}
                        isInvalid={touched.country && !!errors.country}
                      >
                        <option value="1">Russia</option>
                        <option value="2">Belarus</option>
                        <option value="3">Poland</option>
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">{errors.country}</Form.Control.Feedback>
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
                  </Col>
                </Row>
                <Row>
                  <Col xs={10} md={6} className={styles.column}>
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
                    <div key="default-checkbox">
                      <Form.Check type="checkbox" id="default-checkbox" label="Set as default delivery address" />
                    </div>
                  </Col>
                </Row>
              </Col>
              <Row>
                <Col xs={10} md={8} className={styles.column}>
                  <Button variant="dark" type="submit" className={styles.submitBtn}>
                    Continue
                  </Button>
                </Col>
              </Row>
            </Row>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default RegisterPage;
