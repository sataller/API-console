import * as api from '../../api/api';
import * as saga from 'redux-saga/effects';
import {addAction, DataItemType, setIsFetching, updateAction} from '../reducers/requestReducer';
import {AsyncActions} from './asyncActions';

export function* requestWorker(payload: any) {
  yield saga.put(setIsFetching());
  const data: {data: any; status: api.StatusType} = yield api.request(payload.payload);
  yield saga.put(addAction(data));
  yield saga.put(setIsFetching());
}

export function* updateRequestWorker(payload: any) {
  const data: {data: DataItemType} = yield api.request(payload.payload.data);
  yield saga.put(updateAction({id: payload.payload.id, data}));
}

export function* requestWatcher() {
  yield saga.takeEvery(AsyncActions.ASYNC_REQUEST, requestWorker);
}

export function* updateRequestWatcher() {
  yield saga.takeEvery(AsyncActions.ASYNC__UPDATE_REQUEST, updateRequestWorker);
}
