import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type StateType = {
  token: string;
  user: {
    login: string;
    sublogin: string;
  };
};

const initialState: StateType = {
  token: '',
  user: {
    login: '',
    sublogin: '',
  },
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<StateType>) => {
      state = action.payload;
      return state;
    },
    logout: (state) => {
      state.token = '';
      state.user.login = '';
      state.user.sublogin = '';
      return state;
    },
  },
});

export default authSlice.reducer;

export const {login, logout} = authSlice.actions;
