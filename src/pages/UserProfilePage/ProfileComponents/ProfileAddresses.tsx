import React, { useEffect, useState } from 'react';
import { ObjectSchema } from 'yup';
import { Col, Alert } from 'react-bootstrap';
import { BaseAddress } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/common';
import { CustomerAddressSubset, IAddressValuesValidation } from '../../../types/CustomerTypes';
import ProfileAddressCard from './ProfileAddressCard';

type ProfileAddressesProps = {
  data: CustomerAddressSubset;
  validationSchema: ObjectSchema<IAddressValuesValidation>;
};

function ProfileAddresses({ data, validationSchema }: ProfileAddressesProps) {
  const [defaultBillingAddressId, setDefaultBillingAddressId] = useState<string | null>(
    data.defaultBillingAddressId || null,
  );
  const [defaultShippingAddressId, setDefaultShippingAddressId] = useState<string | null>(
    data.defaultShippingAddressId || null,
  );
  useEffect(() => {
    setDefaultBillingAddressId(data.defaultBillingAddressId || null);
    setDefaultShippingAddressId(data.defaultShippingAddressId || null);
  }, [data.defaultBillingAddressId, data.defaultShippingAddressId]);

  const handleSetDefaultBilling = (id: string) => {
    setDefaultBillingAddressId(id);
  };

  const handleSetDefaultShipping = (id: string) => {
    setDefaultShippingAddressId(id);
  };
  return (
    <Col>
      {data.addresses.length > 0 ? (
        data.addresses.map((elem: BaseAddress, index) => {
          const isDefaultBilling = defaultBillingAddressId === elem.id!;
          const isDefaultShipping = defaultShippingAddressId === elem.id!;
          return (
            <ProfileAddressCard
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
  );
}

export default ProfileAddresses;
