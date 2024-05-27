import { Formik } from 'formik';
import React from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { CustomerDraft } from '@commercetools/platform-sdk';
import useAuthContext from '../../hooks/useAuthContext';
import profileValidationSchema from '../../utils/validation';
import CustomTextInput from '../../ui/Input/CustomInput';

type CustomerSubset = Pick<
  CustomerDraft,
  | 'dateOfBirth'
  | 'defaultBillingAddress'
  | 'defaultShippingAddress'
  | 'email'
  | 'firstName'
  | 'lastName'
  | 'password'
  | 'shippingAddresses'
  | 'billingAddresses'
>;

const getInputType = (key: string): string => {
  switch (key) {
    case 'dateOfBirth':
      return 'date';
    case 'password':
      return 'password';
    default:
      return 'text';
  }
};

function getCustomerProfileData(user: CustomerDraft): CustomerSubset {
  return {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    password: '',
    dateOfBirth: user.dateOfBirth,
  };
}

function ProfilePage() {
  const { user } = useAuthContext();
  const userData = getCustomerProfileData(user!);
  return (
    <Container>
      <Formik initialValues={userData} validationSchema={profileValidationSchema} onSubmit={() => {}}>
        {() => (
          <Form>
            {Object.entries(userData).map(([key]) => (
              <Row key={key}>
                <Col md={6} className="my-2">
                  <CustomTextInput
                    label={key.charAt(0).toUpperCase() + key.slice(1)}
                    name={key}
                    type={getInputType(key)}
                    placeholder=""
                    isEditable
                  />
                </Col>
              </Row>
            ))}
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default ProfilePage;
