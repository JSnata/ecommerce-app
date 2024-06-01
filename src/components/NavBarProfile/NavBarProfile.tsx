import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuthContext from '../../hooks/useAuthContext';
import handleLogout from '../../utils/auth';

function NavBarProfile() {
  const { user, dispatch } = useAuthContext();
  const [userProfileData, setUserProfileData] = useState(user);
  useEffect(() => {
    setUserProfileData(user);
  }, [user]);

  return (
    <Dropdown className="mx-3" id="user-profile-doropdown">
      <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
        {userProfileData?.firstName}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item as={Link} to="/profile">
          Profile
        </Dropdown.Item>
        <Dropdown.Item href="">Shopping List</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={() => handleLogout(dispatch)}>Sign out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default NavBarProfile;
