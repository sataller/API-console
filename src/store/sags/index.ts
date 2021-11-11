import {all} from 'redux-saga/effects';
import {requestWatcher, updateRequestWatcher} from './requestSagas';

export function* rootWatcher() {
  yield all([requestWatcher(), updateRequestWatcher]);
}
