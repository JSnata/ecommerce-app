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
import { userTokenCache } from './API/root/BuildCustomer';

function App() {
  const { user, authIsReady, dispatch } = useAuthContext();

  useEffect(() => {
    const tokenCurrentUser = userTokenCache.get()?.token;
    if (tokenCurrentUser) {
      let isMounted = true;

      ApiService.makeAuthorizedRequest()
        .then((response) => {
          if (isMounted) {
            if (response?.data) {
              dispatch({ type: 'AUTH_IS_READY', payload: response.data });
            } else {
              console.error('Response data is undefined');
              dispatch({ type: 'AUTH_ERROR', payload: 'Response data is undefined' });
            }
          }
        })
        .catch((error) => {
          if (isMounted) {
            console.error('The authorized request failed:', error);
            dispatch({ type: 'AUTH_ERROR', payload: error.message });
          }
        });

      return () => {
        isMounted = false;
      };
    }
    return undefined;
  }, [dispatch]);

  useEffect(() => {
    console.log('authIsReady', authIsReady);
  }, [authIsReady]);

  return (
    <>
      <NavigationBar />
      {authIsReady && user && (
        <div>Welcome, {`${user.firstName} ${user.lastName}`}!</div> // Используем объект пользователя
      )}
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
