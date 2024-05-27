import React from 'react';
import { Formik } from 'formik';
import { Form, Row } from 'react-bootstrap';
import { ObjectSchema } from 'yup';
import CustomTextInput from '../../ui/Input/CustomInput';
import { getInputTypeByNameField, updateCustomerData } from './userProfileUtils';
import { CustomerMainProfileSubset, IProfileValuesValidation } from '../../types/CustomerTypes';

type ProfileMainDataProps = {
  data: CustomerMainProfileSubset;
  validationSchema: ObjectSchema<IProfileValuesValidation>;
};

function ProfileMainData({ data, validationSchema }: ProfileMainDataProps) {
  return (
    <Formik initialValues={data} validationSchema={validationSchema} onSubmit={() => {}}>
      {() => (
        <Form>
          {Object.entries(data).map(([key]) => (
            <Row key={key} className="my-2">
              <CustomTextInput
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                name={key}
                type={getInputTypeByNameField(key)}
                placeholder=""
                isEditable
                handleSave={(formData) => updateCustomerData(formData)}
              />
            </Row>
          ))}
        </Form>
      )}
    </Formik>
  );
}

export default ProfileMainData;
