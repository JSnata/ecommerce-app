import React from 'react';
import { ObjectSchema } from 'yup';
import { IAddressValuesValidation } from '../../types/CustomerTypes';

type ProfileAddressesProps = {
  validationSchema: ObjectSchema<IAddressValuesValidation>;
};

function ProfileAddress(address: ProfileAddressesProps) {
  // const { user } = useAuthContext();
  // const adress = user?.addresses[0];
  console.log(address);

  return <p>{123}</p>;
}

export default ProfileAddress;
