import {LoginPayloadType} from '../../api/api';

export enum AsyncActions {
  ASYNC_REQUEST = 'ASYNC_REQUEST',
  ASYNC__UPDATE_REQUEST = 'ASYNC__UPDATE_REQUEST',
  ASYNC_IS_AUTH = 'ASYNC_IS_AUTH',
  ASYNC_LOGIN = 'ASYNC_LOGIN',
}

export const asyncIsAuthAction = () => ({type: AsyncActions.ASYNC_IS_AUTH});

export const asyncRequestAction = (payload: any) => ({type: AsyncActions.ASYNC_REQUEST, payload});

export const asyncLoginAction = (payload: LoginPayloadType) => ({
  type: AsyncActions.ASYNC_LOGIN,
  payload,
});

export const asyncUpdateRequestAction = (payload: {data: any; id: string}) => ({
  type: AsyncActions.ASYNC__UPDATE_REQUEST,
  payload,
});
