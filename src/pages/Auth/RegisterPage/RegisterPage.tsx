import React, { useCallback, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
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
import Country from '../../../types/enumCounty';
import styles from './RegisterPage.module.css';
import useAuthContext from '../../../hooks/useAuthContext';

function RegisterPage() {
  const [showPass, setShowPass] = useState(false);
  const { user, dispatch } = useAuthContext();
  const [sameAsBilling, setSameAsBilling] = useState(0);

  const clickHandler = () => {
    setShowPass((prev) => !prev);
  };

  const setSameAddressHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSameAsBilling(e.target.checked ? 1 : 0);
  };

  const handleSubmitForm = useCallback(
    (values: FormValues) => {
      const registerValues: ICustomerCreateData = {
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
        dateOfBirth: values.dateOfBirth,
        addresses: [
          {
            street: sameAsBilling ? values.street_billing : values.street,
            city: sameAsBilling ? values.city_billing : values.city,
            postalCode: sameAsBilling ? values.code_billing : values.code,
            country: Country[(sameAsBilling ? values.country_billing : values.country) as keyof typeof Country],
          },
          {
            street: values.street_billing,
            city: values.city_billing,
            postalCode: values.code_billing,
            country: Country[values.country_billing as keyof typeof Country],
          },
        ],
        shippingAddresses: [0],
        billingAddresses: [1],
      };

      if (values.default_delivery) {
        registerValues.defaultShippingAddress = 0;
      }

      if (values.default_billing) {
        registerValues.defaultBillingAddress = 1;
      }

      ApiService.register(registerValues).then((res) => {
        if (res) {
          ApiService.login(values.email, values.password)
            .then((userApi) => {
              if (userApi) {
                userApi
                  .me()
                  .get()
                  .execute()
                  .then((response) => {
                    dispatch({ type: 'LOGIN', payload: response.body });
                    return response;
                  });
                // .then((response) => {
                //   // const userId = response.body.id;
                //   // eslint-disable-next-line @typescript-eslint/no-shadow
                //   // ShippingCartService.mergeAnonymousCart();
                // });
              }
            })
            .then(() => {
              if (user) {
                <Redirect to="/" />;
              }
            });
        }
      });
    },
    [sameAsBilling],
  );

  const defaultValidationSchema = {
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

    default_billing: yup.boolean(),
    default_delivery: yup.boolean(),

    street_billing: yup.string().required('This field is required!').min(1, 'Must contain at least 1 character'),
    country_billing: yup.string().required('This field is required!'),
    city_billing: yup
      .string()
      .required('This field is required!')
      .min(1, 'Must contain at least 1 character')
      .matches(/^[^0-9]*$/, 'Field must not contain numbers')
      .matches(/^[^!@#$%^&-+=№;:")(]*$/, 'Field must not contain special characters'),

    code_billing: yup
      .string()
      .required('This field is required!')
      .test('custom-validation', 'Wrong format', (value, context) => {
        switch (context.parent.country_billing) {
          case 'Russia':
            return /^([1-6]{1}[0-9]{5})$/.test(value);
          case 'Belarus':
            return /^(2[1-4]{1}[0-7]{1}[0-9]{3})$/.test(value);
          case 'Poland':
            return /^([0-9]{2}-[0-9]{3})$/.test(value);
          default:
            return false;
        }
      }),
  };

  const deliveryValidationSchema = {
    street: yup.string().required('This field is required!').min(1, 'Must contain at least 1 character'),
    country: yup.string().required('This field is required!'),
    city: yup
      .string()
      .required('This field is required!')
      .min(1, 'Must contain at least 1 character')
      .matches(/^[^0-9]*$/, 'Field must not contain numbers')
      .matches(/^[^!@#$%^&-+=№;:")(]*$/, 'Field must not contain special characters'),
    code: yup
      .string()
      .required('This field is required!')
      .test('custom-validation', 'Wrong format', (value, context) => {
        switch (context.parent.country) {
          case 'Russia':
            return /^([1-6]{1}[0-9]{5})$/.test(value);
          case 'Belarus':
            return /^(2[1-4]{1}[0-7]{1}[0-9]{3})$/.test(value);
          case 'Poland':
            return /^([0-9]{2}-[0-9]{3})$/.test(value);
          default:
            return false;
        }
      }),
  };

  interface FormValues {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    country: string;
    city: string;
    street: string;
    code: string;
    country_billing: string;
    city_billing: string;
    street_billing: string;
    code_billing: string;
    default_billing: boolean;
    default_delivery: boolean;
  }

  const initialValues: FormValues = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    country: '',
    city: '',
    street: '',
    code: '',
    country_billing: '',
    city_billing: '',
    street_billing: '',
    code_billing: '',

    default_billing: false,
    default_delivery: false,
  };

  const validationSchema = yup
    .object()
    .shape({ ...defaultValidationSchema, ...(sameAsBilling ? {} : deliveryValidationSchema) });

  return (
    <div className={styles.formWrapper}>
      <h1>Register</h1>
      <Formik validationSchema={validationSchema} onSubmit={handleSubmitForm} initialValues={initialValues}>
        {({ handleSubmit, handleChange, values, touched, errors, setFieldValue }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Row>
              <Col xs={10} md={6} className={styles.column}>
                <Col>
                  <h4>Personal data</h4>
                </Col>
                <Col>
                  <Form.Group className="email mb-3">
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
                <Col>
                  <Form.Group className="password mb-3">
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
                <Col>
                  <Form.Group className="text mb-3">
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
                <Col>
                  <Form.Group className="text mb-3">
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
                <Col>
                  <Form.Group className="date mb-3">
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
                <Col className={`${styles.column} ${styles.lineCol}`}>
                  <hr className={styles.line} />
                </Col>
              </Col>

              <Col xs={10} md={6} className={styles.column}>
                <Row>
                  <Col md={12} className={styles.column}>
                    <h4 className={styles.billing}>Billing address</h4>
                  </Col>
                </Row>
                <Row>
                  <Col md={6} className={styles.column}>
                    <Form.Group className="country mb-3">
                      <Form.Label>Country</Form.Label>
                      <Form.Control
                        as="select"
                        type="text"
                        name="country_billing"
                        value={values.country_billing}
                        onChange={handleChange}
                        isInvalid={touched.country_billing && !!errors.country_billing}
                      >
                        <option value="">Select a country</option>
                        <option value="Russia">Russia</option>
                        <option value="Belarus">Belarus</option>
                        <option value="Poland">Poland</option>
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">{errors.country_billing}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6} className={styles.column}>
                    <Form.Group className="city mb-3">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        name="city_billing"
                        value={values.city_billing}
                        onChange={handleChange}
                        isInvalid={touched.city_billing && !!errors.city_billing}
                      />
                      <Form.Control.Feedback type="invalid">{errors.city_billing}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6} className={styles.column}>
                    <Form.Group className="street mb-3">
                      <Form.Label>Street</Form.Label>
                      <Form.Control
                        type="text"
                        name="street_billing"
                        value={values.street_billing}
                        onChange={handleChange}
                        isInvalid={touched.street_billing && !!errors.street_billing}
                      />
                      <Form.Control.Feedback type="invalid">{errors.street_billing}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6} className={styles.column}>
                    <Form.Group className="code mb-3">
                      <Form.Label>Postal code</Form.Label>
                      <Form.Control
                        type="text"
                        name="code_billing"
                        value={values.code_billing}
                        onChange={handleChange}
                        isInvalid={touched.code_billing && !!errors.code_billing}
                      />
                      <Form.Control.Feedback type="invalid">{errors.code_billing}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={12} className={styles.column}>
                    <div key="default_billing">
                      <Form.Check
                        type="checkbox"
                        name="default_billing"
                        id="default_billing"
                        onChange={(e) => setFieldValue('default_billing', e.target.checked)}
                        checked={values.default_billing}
                        label="Set as default billing address"
                      />
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col md={12} className={styles.column}>
                    <hr className={styles.line} />
                  </Col>
                </Row>

                <Row>
                  <Col md={12} className={`${styles.column} mb-3`}>
                    <div key="address-same-checkbox">
                      <Form.Check
                        type="checkbox"
                        id="address-same-checkbox"
                        label="Delivery address is the same as billing address"
                        value={sameAsBilling}
                        onChange={setSameAddressHandler}
                      />
                    </div>
                  </Col>
                </Row>

                {/* Delivery fields */}
                {sameAsBilling ? null : (
                  <Col>
                    <Row>
                      <Col md={12} className={styles.column}>
                        <h4>Delivery address</h4>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6} className={styles.column}>
                        <Form.Group className="country mb-3">
                          <Form.Label>Country</Form.Label>
                          <Form.Control
                            as="select"
                            type="text"
                            name="country"
                            value={values.country}
                            onChange={handleChange}
                            isInvalid={touched.country && !!errors.country}
                          >
                            <option value="">Select a country</option>
                            <option value="Russia">Russia</option>
                            <option value="Belarus">Belarus</option>
                            <option value="Poland">Poland</option>
                          </Form.Control>
                          <Form.Control.Feedback type="invalid">{errors.country}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6} className={styles.column}>
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
                      <Col md={6} className={styles.column}>
                        <Form.Group className="street mb-3">
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
                      <Col md={6} className={styles.column}>
                        <Form.Group className="code mb-3">
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
                      <Col md={12} className={styles.column}>
                        <div key="default_delivery">
                          <Form.Check
                            type="checkbox"
                            name="default_delivery"
                            id="default_delivery"
                            onChange={(e) => setFieldValue('default_delivery', e.target.checked)}
                            checked={values.default_delivery}
                            label="Set as default delivery address"
                          />
                        </div>
                      </Col>
                    </Row>
                  </Col>
                )}
              </Col>

              <Row>
                <Col xs={10} md={8} className={styles.column}>
                  <Form.Group className="d-flex justify-content-between align-items-center">
                    <Form.Text className="text-muted">
                      Already have an account?{' '}
                      <Link to="/login" className="btn btn-link p-0 ">
                        Login here
                      </Link>
                    </Form.Text>
                  </Form.Group>
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
