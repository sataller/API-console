import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import * as api from '../../api/api';

type StateType = {
  token: string;
  user: {
    login: string;
    sublogin: string;
  };
  error: boolean;
  errorText: string;
  isFetching: boolean;
  isAuth: boolean;
};

const initialState: StateType = {
  token: '',
  user: {
    login: '',
    sublogin: '',
  },
  isFetching: false,
  isAuth: false,
  error: false,
  errorText: '',
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{data: {data: any; status: api.StatusType}}>) => {
      state.user.login = action.payload.data.data.login;
      state.user.sublogin = action.payload.data.data.sublogin;
      state.token = action.payload.data.data.token;
      state.isAuth = true;
      return state;
    },
    setIsFetching: (state) => {
      state.isFetching = !state.isFetching;
      return state;
    },
    setError: (state, action: PayloadAction<{error: boolean; errorText?: string}>) => {
      state.error = action.payload.error;
      state.errorText = action.payload.errorText || '';
      return state;
    },
    setIsAuth: (state, action: PayloadAction<{isAuth: boolean}>) => {
      state.isAuth = action.payload.isAuth;
      state.user = action.payload.isAuth && JSON.parse(localStorage.getItem('user') || '');
      return state;
    },
    logout: (state) => {
      state.token = '';
      state.user.login = '';
      state.user.sublogin = '';
      state.isAuth = false;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      return state;
    },
  },
});

export default authSlice.reducer;

export const {login, logout, setIsFetching, setIsAuth, setError} = authSlice.actions;
