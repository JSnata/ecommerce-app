import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
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
    <Container>
      <Row>
        <Col>
          <ProfileMainData data={userData} validationSchema={profileValidationSchema} />
        </Col>
        <Col>123</Col>
      </Row>
    </Container>
  );
}

export default ProfilePage;
