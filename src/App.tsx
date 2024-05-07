import React from 'react';
import { Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './pages/Auth/LoginPage/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage/RegisterPage';
import './App.css';
import MainHeader from './components/MainHeader/MainHeader';
import MainPage from './pages/MainPage/MainPage';

function App() {
  return (
    <>
      <MainHeader />
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/" component={MainPage} />
      </Switch>
    </>
  );
}

export default App;
