import React, { useEffect } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import LoginPage from './pages/Auth/LoginPage/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage/RegisterPage';
import NavigationBar from './components/NavigationBar/NavigationBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotFoundPage from './pages/NotFoundPage';
import 'react-toastify/dist/ReactToastify.css';
import useAuthContext from './hooks/useAuthContext';
import ApiService from './API/apiService';
import { userTokenCache } from './API/root/BuildCustomer';
import './styles/App.css';
import ProfilePage from './pages/UserProfilePage/ProfilePage';
import MainPage from './pages/MainPage/MainPage';
import CatalogPage from './pages/Catalog/CatalogPage';
import AboutPage from './pages/About/AboutPage';
import ProductPage from './pages/ProductPage/ProductPage';
import OrderPage from './pages/OrderPage/OrderPage';

function App() {
  const { user, dispatch } = useAuthContext();

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
            if (response?.body) {
              dispatch({ type: 'AUTH_IS_READY', payload: response.body });
            } else {
              console.error('Response data is undefined');
            }
          }
        })
        .catch((error) => {
          if (isMounted) {
            console.error('The authorized request failed:', error);
          }
        });

      return () => {
        isMounted = false;
      };
    }
    return undefined;
  }, [dispatch]);

  // useEffect(() => {
  //   console.log('authIsReady', authIsReady);
  // }, [authIsReady]);

  return (
    <>
      <NavigationBar />
      <Switch>
        <Route exact path="/">
          <MainPage />
        </Route>
        <Route exact path="/product/:id">
          <ProductPage />
        </Route>
        <Route path="/login">{user ? <Redirect to="/" /> : <LoginPage />}</Route>
        <Route path="/register">{user ? <Redirect to="/" /> : <RegisterPage />}</Route>
        <Route path="/category/:id">
          <CatalogPage />
        </Route>
        <Route path="/profile">{user ? <ProfilePage /> : <Redirect to="/login" />}</Route>
        <Route path="/catalog">
          <CatalogPage />
        </Route>
        <Route path="/about">
          <AboutPage />
        </Route>
        <Route path="/order">
          <OrderPage />
        </Route>
        <Route component={NotFoundPage} />
      </Switch>
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default App;
