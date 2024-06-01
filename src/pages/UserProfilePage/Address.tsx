import React from 'react';
import { ObjectSchema } from 'yup';
import { Badge, Button, Card, Col, Form, Stack } from 'react-bootstrap';
import { Formik } from 'formik';
import { BaseAddress } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/common';
import { Trash3Fill } from 'react-bootstrap-icons';
import CustomTextInput from '../../ui/Inputs/CustomInput';
import SelectFieldCountry from './SelectFieldCountry';
import { manageAddressById, updateCustomerAddress } from './profileUtils';
import { IAddressValuesValidation } from '../../types/CustomerTypes';
import useAuthContext from '../../hooks/useAuthContext';

type ProfileAddressesProps = {
  index: number;
  data: BaseAddress;
  isDefaultBilling: boolean;
  isDefaultShipping: boolean;
  validationSchema: ObjectSchema<IAddressValuesValidation>;
  setDefaultBilling: (id: string) => void;
  setDefaultShipping: (id: string) => void;
};

function Address({
  data,
  validationSchema,
  index,
  isDefaultShipping,
  isDefaultBilling,
  setDefaultBilling,
  setDefaultShipping,
}: ProfileAddressesProps) {
  const { dispatch } = useAuthContext();
  const handleManageAddress = async (
    id: string,
    actionType: 'setDefaultBillingAddress' | 'setDefaultShippingAddress' | 'removeAddress',
  ) => {
    const response = await manageAddressById(id, actionType);
    if (response) {
      dispatch({ type: 'LOGIN', payload: response.body });
      if (actionType === 'setDefaultBillingAddress' && response.body.defaultBillingAddressId) {
        setDefaultBilling(response.body.defaultBillingAddressId[0]);
      } else if (actionType === 'setDefaultShippingAddress' && response.body.defaultShippingAddressId) {
        setDefaultShipping(response.body.defaultShippingAddressId[0]);
      }
    }
  };

  const handleChangeAddress = async (values: BaseAddress) => {
    await updateCustomerAddress(values).then((response) => {
      if (response) {
        dispatch({ type: 'LOGIN', payload: response.body });
      }
    });
  };

  return (
    <Formik
      initialValues={data}
      validateOnChange
      validateOnBlur
      onSubmit={handleChangeAddress}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Card className="p-3 mb-2" key={data.id}>
            <h5>{`Address ${index + 1}`}</h5>
            {Object.entries(data).map(
              ([key, fieldValue]) =>
                key !== 'id' &&
                (key === 'country' ? (
                  <SelectFieldCountry
                    key={`${key}${data.id}`}
                    label={key.charAt(0).toUpperCase() + key.slice(1)}
                    name={key}
                    value={fieldValue}
                  />
                ) : (
                  <CustomTextInput
                    key={`${key}${data.id}`}
                    label={key.charAt(0).toUpperCase() + key.slice(1)}
                    name={key}
                    type="text"
                    placeholder=""
                  />
                )),
            )}
            <Card.Footer>
              <Col>
                <Stack direction="horizontal" gap={2}>
                  <Button
                    size="sm"
                    type="button"
                    variant="link"
                    onClick={() => handleManageAddress(data.id!, 'setDefaultBillingAddress')}
                  >
                    <Badge bg={isDefaultBilling ? 'info' : 'secondary'}>Default Billing</Badge>
                  </Button>
                  <Button
                    size="sm"
                    type="button"
                    variant="link"
                    onClick={() => handleManageAddress(data.id!, 'setDefaultShippingAddress')}
                  >
                    <Badge bg={isDefaultShipping ? 'info' : 'secondary'}>Default Shipping</Badge>
                  </Button>
                  <Button type="submit" size="sm">
                    Save changes
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="danger"
                    onClick={() => handleManageAddress(data.id!, 'removeAddress')}
                  >
                    <Trash3Fill />
                  </Button>
                </Stack>
              </Col>
            </Card.Footer>
          </Card>
        </Form>
      )}
    </Formik>
  );
}

export default Address;
