import {configureStore, combineReducers} from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import requestReducer from './reducers/requestReducer';
import createSagaMiddleware from 'redux-saga';
import {rootWatcher} from './sags';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  auth: authReducer,
  request: requestReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootWatcher);

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof rootReducer>;

export default store;
