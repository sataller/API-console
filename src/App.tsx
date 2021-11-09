import React from 'react';
import Login from './components/LoginPage/Login';
import Console from './components/ConsolePage/Console';
import styled from 'styled-components';
import {sendsay} from './initSendsay';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

const App = () => {
  const isAuth = () => {
    let userLocal = localStorage.getItem('user');
    if (!userLocal) {
      return;
    }
    if (!sendsay.session) {
      sendsay.setSession(localStorage.getItem('token'));
    }
    return true;
  };

  return (
    <Wrapper>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/login" render={() => (!isAuth() ? <Login /> : <Redirect to="/console" />)} />
          <Route exact path="/console" render={() => (isAuth() ? <Console /> : <Redirect to="/login" />)} />
        </Switch>
      </BrowserRouter>
    </Wrapper>
  );
};

export default App;

const Wrapper = styled.div``;
