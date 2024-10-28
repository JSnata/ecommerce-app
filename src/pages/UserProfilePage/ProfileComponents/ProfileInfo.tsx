import React from 'react';
import { Formik } from 'formik';
import { Form, Row } from 'react-bootstrap';
import { ObjectSchema } from 'yup';
import CustomTextInput from '../../../ui/Inputs/CustomInput';
import { getInputTypeByNameField, updateCustomerData } from '../profileUtils';
import { CustomerProfileSubset, IProfileValuesValidation } from '../../../types/CustomerTypes';

type ProfileInfoProps = {
  data: CustomerProfileSubset;
  validationSchema: ObjectSchema<IProfileValuesValidation>;
};

function ProfileInfo({ data, validationSchema }: ProfileInfoProps) {
  return (
    <Formik initialValues={data} validationSchema={validationSchema} onSubmit={() => {}}>
      {() => (
        <Form>
          <h4>My main info</h4>
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

export default ProfileInfo;
