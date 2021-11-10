import * as api from '../../api/api';
import * as saga from 'redux-saga/effects';
import {addAction, setRequestError} from '../reducers/requestReducer';
import {AsyncActions} from './asyncActions';

export function* requestWorker(payload: any) {
  // const payload = {action: 'pong'};
  const test: {data: any; status: string} = yield api.request(payload.payload);
  yield saga.put(addAction(test));
}

// export function* requestErrorWorker(payload: {type: string; payload: boolean}) {
//   yield saga.put(setRequestError(payload.payload));
// }

export function* requestWatcher() {
  yield saga.takeEvery(AsyncActions.ASYNC_REQUEST, requestWorker);
}

// export function* requestErrorWatcher() {
//   yield saga.takeEvery(AsyncActions.ASYNC_REQUEST_ERROR, requestErrorWorker);
// }
