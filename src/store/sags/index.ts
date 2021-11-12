import {all} from 'redux-saga/effects';
import {requestWatcher, updateRequestWatcher} from './requestSagas';
import {isAuthWatcher, logintWatcher} from './authSagas';

export function* rootWatcher() {
  yield all([requestWatcher(), updateRequestWatcher(), isAuthWatcher(), logintWatcher()]);
}
