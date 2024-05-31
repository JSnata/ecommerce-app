import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import useAuthContext from '../../hooks/useAuthContext';
import { getCustomerAddressData, getCustomerMainProfileData } from './profileUtils';
import ProfileInfo from './ProfileInfo';
import ProfilePassword from './ProfilePassword';
import { addressValidationSchema, passwordValidationSchema, profileValidationSchema } from '../../utils/validation';
import ProfileAddress from './ProfileAddress';

function ProfilePage() {
  const { user } = useAuthContext();
  const userProfileData = getCustomerMainProfileData(user!);
  const userAddressData = getCustomerAddressData(user!);
  console.log(userAddressData, 'address data');
  return (
    <Container className="my-4">
      <Row>
        <Col xs={12} sm={12} md={6}>
          <ProfileInfo data={userProfileData} validationSchema={profileValidationSchema} />
        </Col>
        <Col xs={12} sm={12} md={6}>
          <ProfilePassword validationSchema={passwordValidationSchema} />
        </Col>
      </Row>
      <Row>
        <Col>
          <ProfileAddress data={userAddressData} validationSchema={addressValidationSchema} />
        </Col>
      </Row>
    </Container>
  );
}

export default ProfilePage;
