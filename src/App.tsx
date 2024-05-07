import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LoginPage from './pages/Auth/LoginPage/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage/RegisterPage';
import MainHeader from './components/MainHeader/MainHeader';
import HomePage from './pages/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <>
      <MainHeader />
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/" component={HomePage} />
      </Switch>
    </>
  );
}

export default App;
