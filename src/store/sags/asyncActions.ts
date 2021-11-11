import {DataItemType} from '../reducers/requestReducer';

export enum AsyncActions {
  ASYNC_REQUEST = 'ASYNC_REQUEST',
  ASYNC__UPDATE_REQUEST = 'ASYNC__UPDATE_REQUEST',
  // SET_IS_FETCHING = 'SET_IS_FETCHING',
}
// export const asyncSetIsFetchingAction = () => ({type: AsyncActions.SET_IS_FETCHING});
export const asyncRequestAction = (payload: any) => ({type: AsyncActions.ASYNC_REQUEST, payload});
export const asyncUpdateRequestAction = (payload: {data: DataItemType; id: string}) => ({
  type: AsyncActions.ASYNC__UPDATE_REQUEST,
  payload,
});
