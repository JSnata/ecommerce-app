import React from 'react';
import { Container } from 'react-bootstrap';
import useAuthContext from '../../hooks/useAuthContext';

function ProfilePage() {
  const { user } = useAuthContext();
  console.log('user', user);
  return (
    <Container className="my-5">
      <p>Profile</p>
      <p>{user?.firstName}</p>
      <p>{user?.email}</p>
    </Container>
  );
}

export default ProfilePage;
