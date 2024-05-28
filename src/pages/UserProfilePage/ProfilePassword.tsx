import React from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import { ObjectSchema } from 'yup';
import CustomTextInput from '../../ui/Input/CustomInput';
import { changeCustomerPassword } from './profileUtils';
import { IPasswordValuesValidation } from '../../types/CustomerTypes';

type ProfilePasswordProps = {
  validationSchema: ObjectSchema<IPasswordValuesValidation>;
};

function ProfilePassword({ validationSchema }: ProfilePasswordProps) {
  const updatePassword = async (values: { currentPassword: string; newPassword: string }) => {
    try {
      await changeCustomerPassword(values.currentPassword, values.newPassword);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Formik
      initialValues={{ currentPassword: '', newPassword: '' }}
      validationSchema={validationSchema}
      validateOnChange
      validateOnBlur
      onSubmit={updatePassword}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Row className="my-2">
            <CustomTextInput
              label="Current Password"
              name="currentPassword"
              type="password"
              placeholder="Please enter your old password"
            />
          </Row>
          <Row className="my-2">
            <CustomTextInput
              label="New Password"
              name="newPassword"
              type="password"
              placeholder="Please enter your new password"
            />
          </Row>
          <Button type="submit" variant="dark" size="sm">
            Update password
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default ProfilePassword;
