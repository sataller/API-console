import {configureStore, combineReducers} from '@reduxjs/toolkit';
import * as reducers from './reducers';

const rootReducer = combineReducers({
  ...reducers,
});

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof rootReducer>;

export default store;
