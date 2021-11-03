import React from 'react';
import Login from './components/LoginPage/Login';
import Console from './components/ConsolePage/Console';
import styled from 'styled-components';
import {sendsay} from './initSendsay';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';


const App = () => {

  const isAuth = () => {
    // const { user: userRedux } = store.getState();
    let userLocal = localStorage.getItem('user');
    if (!userLocal) {
      return;
    }
    userLocal = JSON.parse(userLocal);
    if (!sendsay.session) {
      sendsay.setSession(localStorage.getItem('session'));
    }
    // if (!userRedux.login) {
    //   store.dispatch({ type: 'ON_LOGIN', payload: userLocal });
    // }
    return true;
  };

  return (
    <Wrapper>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route exact path='/login' component={Login} />
          <Route
            exact
            path='/console'
            render={() => (isAuth() ? <Console /> : <Redirect to='/login' />)
            }
          />
        </Switch>
      </BrowserRouter>
    </Wrapper>
  );
};

export default App;

const Wrapper = styled.div``;
