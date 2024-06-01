import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import useAuthContext from '../../hooks/useAuthContext';
import { getCustomerAddressData, getCustomerMainProfileData } from './profileUtils';
import ProfileInfo from './ProfileComponents/ProfileInfo';
import ProfilePassword from './ProfileComponents/ProfilePassword';
import { addressValidationSchema, passwordValidationSchema, profileValidationSchema } from '../../utils/validation';
import ProfileAddresses from './ProfileComponents/ProfileAddresses';
import ProfileNewAddress from './ProfileComponents/ProfileNewAddress';

function ProfilePage() {
  const { user } = useAuthContext();
  const [userProfileData, setUserProfileData] = useState(getCustomerMainProfileData(user!));
  const [userAddressData, setUserAddressData] = useState(getCustomerAddressData(user!));

  useEffect(() => {
    setUserProfileData(getCustomerMainProfileData(user!));
    setUserAddressData(getCustomerAddressData(user!));
  }, [user]);

  console.log(userAddressData, 'address data');
  return (
    <Container className="my-4">
      <h1>Profile Page</h1>
      <p />
      <Row>
        <Col xs={12} sm={12} md={6} className="my-4">
          <ProfileInfo data={userProfileData} validationSchema={profileValidationSchema} />
        </Col>
        <Col xs={12} sm={12} md={6} className="my-4">
          <ProfilePassword validationSchema={passwordValidationSchema} />
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={12} md={6} className="my-4">
          <h4>My Addresses</h4>
          <ProfileAddresses data={userAddressData} validationSchema={addressValidationSchema} />
        </Col>
        <Col xs={12} sm={12} md={6} className="my-4">
          <h4>Add New Address</h4>
          <ProfileNewAddress validationSchema={addressValidationSchema} />
        </Col>
      </Row>
    </Container>
  );
}

export default ProfilePage;
