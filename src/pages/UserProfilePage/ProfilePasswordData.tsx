import React from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import { ObjectSchema } from 'yup';
import CustomTextInput from '../../ui/Input/CustomInput';
import { IProfileValuesValidation } from '../../types/CustomerTypes';

type ProfileMainDataProps = {
  validationSchema: ObjectSchema<IProfileValuesValidation>;
};

function ProfilePasswordData({ validationSchema }: ProfileMainDataProps) {
  return (
    <Formik
      initialValues={{ 'old-password': '', 'new-password': '' }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        console.log('Submitted values:', values);
        setSubmitting(false);
      }}
      validateOnChange
      validateOnBlur={false}
    >
      {() => (
        <Form>
          <Row className="my-2">
            <CustomTextInput
              label="Old Password"
              name="oldPassword"
              type="password"
              placeholder="Please enter your old password"
            />
          </Row>
          <Row className="my-2">
            <CustomTextInput
              label="New Password"
              name="password"
              type="password"
              placeholder="Please enter your new password"
            />
          </Row>
          {/* Example submit button */}
          <Button type="submit" variant="secondary" size="sm">
            Update password
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default ProfilePasswordData;
