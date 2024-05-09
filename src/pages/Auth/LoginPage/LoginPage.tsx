import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Eye, EyeSlashFill } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import { Formik } from 'formik';
import * as yup from 'yup';
import styles from './LoginPage.module.css';

function LoginForm() {
  const [showPass, setShowPass] = useState(false);
  const clickHandler = () => {
    setShowPass((prev) => !prev);
  };

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required('This field is required!')
      .email('Invalid email')
      .matches(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email'),
    password: yup
      .string()
      .required('This field is required!')
      .min(8)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
        'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character',
      ),
  });

  const handleSubmitForm = (values: { email: string; password: string }) => {
    console.log('Email:', values.email);
    console.log('Password:', values.password);
  };

  return (
    <div className={styles.formWrapper}>
      <h1>Sign in</h1>
      <Formik
        validationSchema={validationSchema}
        onSubmit={handleSubmitForm}
        initialValues={{
          email: '',
          password: '',
        }}
      >
        {({ handleSubmit, handleChange, values, touched, errors, isValid }) => (
          <Form className={styles.form} noValidate onSubmit={handleSubmit}>
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
              </InputGroup>
              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
            </Form.Group>
            <Button variant="dark" type="submit" disabled={!isValid}>
              Continue
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default LoginForm;
