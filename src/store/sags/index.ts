import {all} from 'redux-saga/effects';
import {requestWatcher} from './requestSagas';

export function* rootWatcher() {
  yield all([requestWatcher()]);
}
