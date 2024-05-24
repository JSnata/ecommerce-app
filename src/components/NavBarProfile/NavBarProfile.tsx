import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import useAuthContext from '../../hooks/useAuthContext';

function NavBarProfile() {
  const { user, dispatch } = useAuthContext();
  const handleLogout = () => {
    dispatch({ type: 'LOGOUT', payload: null });
    localStorage.removeItem('token');
    toast('Logged out');
  };
  return (
    <Dropdown className="mx-3" id="user-profile-doropdown">
      <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
        {user?.firstName}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item as={Link} to="/profile">
          Profile
        </Dropdown.Item>
        <Dropdown.Item href="">Shopping List</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default NavBarProfile;
