import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Formik } from 'formik';
import * as yup from 'yup';
import styles from './LoginPage.module.css';

function LoginForm() {
  const validationSchema = yup.object().shape({
    email: yup.string().required('This field is required!').email('Invalid email'),
    password: yup.string().required('This field is required!'),
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
              <Form.Control
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                isInvalid={touched.password && !!errors.password}
              />
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
