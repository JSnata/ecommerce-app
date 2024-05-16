import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import LoginPage from './pages/Auth/LoginPage/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage/RegisterPage';
import NavigationBar from './components/NavigationBar/NavigationBar';
import MainPage from './pages/MainPage/MainPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotFoundPage from './pages/NotFoundPage';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import useAuthContext from './hooks/useAuthContext';
import ApiService from './API/apiService';

function App() {
  const { user, authIsReady, dispatch } = useAuthContext();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      ApiService.checkAuth().then((response) => {
        if (response) {
          dispatch({ type: 'AUTH_IS_READY', payload: response.data.user });
        }
      });
      console.log(user);
    }
  }, []);

  useEffect(() => {
    console.log('authIsReady', authIsReady);
  }, [authIsReady]);

  return (
    <>
      <NavigationBar />
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route exact path="/" component={MainPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default App;
