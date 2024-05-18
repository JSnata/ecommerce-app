import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Eye, EyeSlashFill } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import { Formik } from 'formik';
import * as yup from 'yup';
import ApiService from '../../../API/apiService';
import styles from './LoginPage.module.css';
import useAuthContext from '../../../hooks/useAuthContext';

interface FormValues {
  email: string;
  password: string;
}

function LoginForm() {
  const [showPass, setShowPass] = useState(false);
  const { user, dispatch } = useAuthContext();
  const history = useHistory();

  const clickHandler = () => {
    setShowPass((prev) => !prev);
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
  });

  const handleSubmitForm = (values: FormValues) => {
    // const apiCustomer = await signingCustomer(values.email, values.password);
    console.log('Email:', values.email);
    console.log('Password:', values.password);
    ApiService.login(values.email, values.password)
      .then((userApi) => {
        dispatch({ type: 'LOGIN', payload: userApi });
      })
      .then(() => {
        if (user) {
          history.push('/');
        }
      });
  };

  return (
    <div className={styles.formWrapper}>
      <h1>Login</h1>
      <Formik
        validationSchema={validationSchema}
        onSubmit={handleSubmitForm}
        initialValues={{
          email: '',
          password: '',
        }}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
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
                <InputGroup.Text onClick={clickHandler}>{showPass ? <Eye /> : <EyeSlashFill />}</InputGroup.Text>´
                <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group className="d-flex justify-content-between align-items-center">
              <Form.Text className="text-muted">
                Do not have an account?{' '}
                <Link to="/register" className="btn btn-link p-0 ">
                  Register here
                </Link>
              </Form.Text>
            </Form.Group>
            <Button variant="dark" type="submit">
              Continue
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default LoginForm;
