import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LoginPage from './pages/Auth/LoginPage/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage/RegisterPage';
import NavigationBar from './components/NavigationBar/NavigationBar';
import MainPage from './pages/MainPage/MainPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotFoundPage from './pages/NotFoundPage';
import './App.css';

function App() {
  return (
    <>
      <NavigationBar />
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route exact path="/" component={MainPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </>
  );
}

export default App;
