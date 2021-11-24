import React from 'react';
import Login from './components/LoginPage/Login';
import Console from './components/ConsolePage/Console';
import {sendsay} from './initSendsay';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from './hooks/redux';
import {asyncIsAuthAction} from './store/sags/asyncActions';

const App = () => {
  const {isAuth} = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (!isAuth) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      sendsay.session = undefined;
      return;
    }

    let userLocal = localStorage.getItem('user');
    let userToken = localStorage.getItem('token');

    if (!userLocal && !userToken) return;

    sendsay.session = sendsay.session || userToken;
    dispatch(asyncIsAuthAction());
  }, [isAuth, dispatch]);

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={() => (isAuth ? <Redirect to="/console" /> : <Login />)} />
          <Route exact path="/login" render={() => (!isAuth ? <Login /> : <Redirect to="/console" />)} />
          <Route exact path="/console" render={() => (isAuth ? <Console /> : <Redirect to="/login" />)} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
