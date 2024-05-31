import React, { useState } from 'react';
import { ObjectSchema } from 'yup';
import { Col, Row, Alert } from 'react-bootstrap';
import { BaseAddress } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/common';
import { CustomerAddressSubset, IAddressValuesValidation } from '../../types/CustomerTypes';
import Address from './Address';

type ProfileAddressesProps = {
  data: CustomerAddressSubset;
  validationSchema: ObjectSchema<IAddressValuesValidation>;
};

function ProfileAddress({ data, validationSchema }: ProfileAddressesProps) {
  const [defaultBillingAddressId, setDefaultBillingAddressId] = useState<string | null>(
    data.defaultBillingAddressId || null,
  );
  const [defaultShippingAddressId, setDefaultShippingAddressId] = useState<string | null>(
    data.defaultShippingAddressId || null,
  );

  const handleSetDefaultBilling = (id: string) => {
    setDefaultBillingAddressId(id);
  };

  const handleSetDefaultShipping = (id: string) => {
    setDefaultShippingAddressId(id);
  };
  return (
    <Row>
      <Col xs={12} sm={12} md={6}>
        <h4>My Addresses</h4>
        {data.addresses.length > 0 ? (
          data.addresses.map((elem: BaseAddress, index) => {
            const isDefaultBilling = defaultBillingAddressId === elem.id!;
            const isDefaultShipping = defaultShippingAddressId === elem.id!;
            return (
              <Address
                key={elem.id}
                data={elem}
                index={index}
                validationSchema={validationSchema}
                isDefaultBilling={isDefaultBilling}
                isDefaultShipping={isDefaultShipping}
                setDefaultBilling={handleSetDefaultBilling}
                setDefaultShipping={handleSetDefaultShipping}
              />
            );
          })
        ) : (
          <Alert variant="info">No addresses found.</Alert>
        )}
      </Col>
    </Row>
  );
}

export default ProfileAddress;
