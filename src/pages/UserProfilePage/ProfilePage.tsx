import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import useAuthContext from '../../hooks/useAuthContext';
import { getCustomerMainProfileData } from './profileUtils';
import ProfileInfo from './ProfileInfo';
import ProfilePassword from './ProfilePassword';
import { passwordValidationSchema, profileValidationSchema } from '../../utils/validation';

function ProfilePage() {
  const { user } = useAuthContext();
  const userData = getCustomerMainProfileData(user!);
  return (
    <Container>
      <Row>
        <Col>
          <ProfileInfo data={userData} validationSchema={profileValidationSchema} />
        </Col>
        <Col>
          <ProfilePassword validationSchema={passwordValidationSchema} />
        </Col>
      </Row>
    </Container>
  );
}

export default ProfilePage;
