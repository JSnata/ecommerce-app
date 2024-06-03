import React from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import { ObjectSchema } from 'yup';
import { useHistory } from 'react-router-dom';
import CustomTextInput from '../../../ui/Inputs/CustomInput';
import { changeCustomerPassword } from '../profileUtils';
import { IPasswordValuesValidation } from '../../../types/CustomerTypes';
import handleLogout from '../../../utils/auth';
import useAuthContext from '../../../hooks/useAuthContext';

type ProfilePasswordProps = {
  validationSchema: ObjectSchema<IPasswordValuesValidation>;
};

function ProfilePassword({ validationSchema }: ProfilePasswordProps) {
  const history = useHistory();
  const { dispatch } = useAuthContext();
  const updatePassword = (values: { currentPassword: string; newPassword: string }) => {
    changeCustomerPassword(values.currentPassword, values.newPassword)
      .then((response) => {
        if (response?.statusCode === 200) {
          handleLogout(dispatch);
          history.push('/login');
        }
      })
      .catch((error) => console.error(error));
  };
  return (
    <Formik
      initialValues={{ currentPassword: '', newPassword: '' }}
      validationSchema={validationSchema}
      validateOnChange
      validateOnBlur={false}
      onSubmit={updatePassword}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <h4>My password</h4>
          <Row className="my-2">
            <CustomTextInput
              label="Current Password"
              name="currentPassword"
              type="text"
              placeholder="Please enter your old password"
            />
          </Row>
          <Row className="my-2">
            <CustomTextInput
              label="New Password"
              name="newPassword"
              type="text"
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
