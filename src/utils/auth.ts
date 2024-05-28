import { toast } from 'react-toastify';
import React from 'react';
import { Action } from '../context/AuthContext';

const handleLogout = (dispatch: React.Dispatch<Action>) => {
  dispatch({ type: 'LOGOUT', payload: null });
  localStorage.removeItem('token');
  toast('Logged out');
};
export default handleLogout;
