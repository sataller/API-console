import React from 'react';
import Login from './components/LoginPage/Login';
import Console from './components/ConsolePage/Console';
import {sendsay} from './initSendsay';
import * as api from './api/api';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import store from './store/store';
import {Provider} from 'react-redux';

const App = () => {
  const requestIsAuth = async () => {
    return await api.isAuth();
  };

  const isAuth = () => {
    let userLocal = localStorage.getItem('user');
    let userToken = localStorage.getItem('token');

    if (!userLocal && !userToken) return;

    sendsay.session = sendsay.session || userToken;

    return requestIsAuth();
  };

  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={() => (isAuth() ? <Redirect to="/console" /> : <Login />)} />
            <Route exact path="/login" render={() => (!isAuth() ? <Login /> : <Redirect to="/console" />)} />
            <Route exact path="/console" render={() => (isAuth() ? <Console /> : <Redirect to="/login" />)} />
          </Switch>
        </BrowserRouter>
      </Provider>
    </div>
  );
};

export default App;
