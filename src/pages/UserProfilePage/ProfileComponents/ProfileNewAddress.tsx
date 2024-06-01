import React from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { Formik, FormikHelpers } from 'formik';
import { ObjectSchema } from 'yup';
import { IAddressValuesValidation } from '../../../types/CustomerTypes';
import SelectFieldCountry from '../../../ui/Inputs/SelectFieldCountry';
import CustomTextInput from '../../../ui/Inputs/CustomInput';
import { addNewAddress } from '../profileUtils';
import useAuthContext from '../../../hooks/useAuthContext';

type ProfileNewAddressProps = {
  validationSchema: ObjectSchema<IAddressValuesValidation>;
};

function ProfileNewAddress({ validationSchema }: ProfileNewAddressProps) {
  const { dispatch } = useAuthContext();
  const initialValues: IAddressValuesValidation = {
    streetName: '',
    postalCode: '',
    city: '',
    country: '',
  };

  const handleSave = async (values: IAddressValuesValidation, actions: FormikHelpers<IAddressValuesValidation>) => {
    await addNewAddress(values).then((response) => {
      if (response) {
        dispatch({ type: 'LOGIN', payload: response.body });
        actions.resetForm();
      }
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validateOnChange
      validateOnBlur
      onSubmit={handleSave}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Card className="p-3 mb-2">
            <h5>New Address</h5>
            {Object.entries(initialValues).map(([key, fieldValue]) =>
              key === 'country' ? (
                <SelectFieldCountry
                  key={`${key}-input`}
                  label={key.charAt(0).toUpperCase() + key.slice(1)}
                  name={key}
                  value={fieldValue}
                />
              ) : (
                <CustomTextInput
                  key={`${key}-input`}
                  label={key.charAt(0).toUpperCase() + key.slice(1)}
                  name={key}
                  type="text"
                  placeholder=""
                />
              ),
            )}
            <Card.Footer>
              <Button type="submit" size="sm">
                Add Address
              </Button>
            </Card.Footer>
          </Card>
        </Form>
      )}
    </Formik>
  );
}

export default ProfileNewAddress;
