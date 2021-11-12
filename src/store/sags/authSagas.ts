import * as api from '../../api/api';
import * as saga from 'redux-saga/effects';
import * as auth from '../reducers/authReducer';
import {AsyncActions} from './asyncActions';

export function* isAuthWorker() {
  yield saga.put(auth.setIsFetching());
  const data: {isAuth: boolean} = yield api.isAuth();
  yield saga.put(auth.setIsAuth(data));
  yield saga.put(auth.setIsFetching());
}

export function* loginWorker(payload: {type: string; payload: api.LoginPayloadType}) {
  yield saga.put(auth.setIsFetching());
  const data: {data: any; status: api.StatusType} = yield api.logIn(payload.payload);

  if (data.status === api.Status.ERROR) {
    yield saga.put(auth.setError({error: true, errorText: `{id: ${data.data?.id}, explain: ${data.data?.explain}`}));
  } else {
    yield saga.put(auth.login({data}));
  }
  yield saga.put(auth.setIsFetching());
}

export function* isAuthWatcher() {
  yield saga.takeEvery(AsyncActions.ASYNC_IS_AUTH, isAuthWorker);
}

export function* logintWatcher() {
  yield saga.takeEvery(AsyncActions.ASYNC_LOGIN, loginWorker);
}
