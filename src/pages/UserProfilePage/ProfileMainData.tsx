import React from 'react';
import { Formik } from 'formik';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { ObjectSchema } from 'yup';
import CustomTextInput from '../../ui/Input/CustomInput';
import { getInputTypeByNameField, updateCustomerData } from './userProfileUtils';
import { CustomerMainProfileSubset, IProfileValuesValidation } from '../../types/CustomerTypes';

type ProfileMainDataProps = {
  data: CustomerMainProfileSubset;
  version: number;
  validationSchema: ObjectSchema<IProfileValuesValidation>;
};

function ProfileMainData({ data, validationSchema, version }: ProfileMainDataProps) {
  return (
    <Container>
      <Formik initialValues={data} validationSchema={validationSchema} onSubmit={() => {}}>
        {() => (
          <Form>
            {Object.entries(data).map(([key]) => (
              <Row key={key}>
                <Col md={6} className="my-2">
                  <CustomTextInput
                    label={key.charAt(0).toUpperCase() + key.slice(1)}
                    name={key}
                    type={getInputTypeByNameField(key)}
                    placeholder=""
                    isEditable
                    handleSave={(formData) => updateCustomerData(formData, version)}
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

export default ProfileMainData;
