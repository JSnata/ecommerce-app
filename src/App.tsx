import React, { useEffect } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import LoginPage from './pages/Auth/LoginPage/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage/RegisterPage';
import NavigationBar from './components/NavigationBar/NavigationBar';
import MainPage from './pages/MainPage/MainPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotFoundPage from './pages/NotFoundPage';
import 'react-toastify/dist/ReactToastify.css';
import useAuthContext from './hooks/useAuthContext';
import ApiService from './API/apiService';
import { userTokenCache } from './API/root/BuildCustomer';
import './styles/App.css';

function App() {
  const { user, authIsReady, dispatch } = useAuthContext();

  useEffect(() => {
    const tokenCurrentUser = userTokenCache.get()?.token;
    if (tokenCurrentUser) {
      let isMounted = true;
      ApiService.userApi
        ?.me()
        .get()
        .execute()
        .then((response) => {
          if (isMounted) {
            console.log(response, 'response from sdk typesp');
            if (response?.body) {
              dispatch({ type: 'AUTH_IS_READY', payload: response.body });
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
        <Route exact path="/">
          <MainPage />
        </Route>
        <Route path="/login">{user ? <Redirect to="/" /> : <LoginPage />}</Route>
        <Route path="/register">{user ? <Redirect to="/" /> : <RegisterPage />}</Route>
        <Route component={NotFoundPage} />
      </Switch>
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default App;
