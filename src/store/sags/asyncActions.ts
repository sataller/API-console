export enum AsyncActions {
  ASYNC_REQUEST = 'ASYNC_REQUEST',
  ASYNC_REQUEST_ERROR = 'ASYNC_REQUEST_ERROR',
}
export const asyncRequestAction = (payload: any) => ({type: AsyncActions.ASYNC_REQUEST, payload});
// export const asyncRequestErrorAction = (payload: boolean) => ({type: AsyncActions.ASYNC_REQUEST_ERROR, payload});
