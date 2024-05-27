import React from 'react';
import useAuthContext from '../../hooks/useAuthContext';
import profileValidationSchema from '../../utils/validation';
import { getCustomerMainProfileData } from './userProfileUtils';
import ProfileMainData from './ProfileMainData';

function ProfilePage() {
  const { user } = useAuthContext();
  console.log(user, 'profile full data');
  const userData = getCustomerMainProfileData(user!);
  // const addressesData = getCustomerAddressData(user!);
  console.log('user data', userData);
  // console.log('adresses data', addressesData);
  return (
    <ProfileMainData
      data={userData}
      validationSchema={profileValidationSchema}
      version={user?.version ? user.version : 1}
    />
  );
}

export default ProfilePage;
