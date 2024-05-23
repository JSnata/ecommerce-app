import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { toast } from 'react-toastify';
import useAuthContext from '../../hooks/useAuthContext';

function NavBarProfile() {
  const { user, dispatch } = useAuthContext();
  // const location = useLocation();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT', payload: null });
    localStorage.removeItem('token');
    toast('Logged out');
  };
  return (
    <Dropdown className="mx-3">
      <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
        {user?.firstName}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item>Profile</Dropdown.Item>
        <Dropdown.Item href="#">Shopping List</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default NavBarProfile;
