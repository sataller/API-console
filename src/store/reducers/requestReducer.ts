import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Status} from '../../api/api';

type StateType = {
  data: {
    dataList: DataListType;
    maxLength: number;
  };
  responseError: boolean;
  requestError: boolean;
  isFetching: boolean;
  activeTab: number;
};

type DataListType = {
  [key: string]: DataItemType;
};

export type DataItemType = {
  request: any;
  response: any;
  status: string;
};

const newField = {
  request: {
    action: 'new field',
  },
  response: {},
  status: 'Ok',
};

const initialState: StateType = {
  data: {
    dataList: {
      '20': newField,
    },
    maxLength: 0,
  },
  responseError: false,
  requestError: false,
  isFetching: false,
  activeTab: 0,
};

const requestSlice = createSlice({
  name: 'requestSlice',
  initialState,
  reducers: {
    initActions: (state) => {
      const actions = localStorage.getItem('userActions');
      state.data = actions ? JSON.parse(actions).data : initialState.data;
      return state;
    },
    addAction: (state, action: PayloadAction<{data: DataItemType; status: string}>) => {
      const key = state.data.maxLength >= 19 ? 0 : state.data.maxLength;
      state.responseError = action.payload.data.status === Status.ERROR;
      state.data.dataList[key] = action.payload.data;
      state.activeTab = key;
      state.data.maxLength = state.data.maxLength >= 19 ? 0 : key + 1;
      localStorage.setItem('userActions', JSON.stringify(state));
      return state;
    },
    setIsFetching: (state) => {
      console.log(state.isFetching);
      state.isFetching = !state.isFetching;
      return state;
    },
    removeAction: (state, action: PayloadAction<{id: string}>) => {
      const newData: DataListType = {
        ...state.data.dataList,
      };
      delete newData[action.payload.id];
      state.data.dataList = newData;
      state.activeTab = 20;
      state.data.maxLength = state.data.maxLength - 1;
      localStorage.setItem('userActions', JSON.stringify(state));
      return state;
    },
    updateAction: (state, action: PayloadAction<{id: string; data: DataItemType}>) => {
      state.data.dataList[action.payload.id] = action.payload.data;
      localStorage.setItem('userActions', JSON.stringify(state));
      return state;
    },
    removeAllActions: (state) => {
      state.data.dataList = initialState.data.dataList;
      localStorage.setItem('userActions', JSON.stringify(state));
      return state;
    },
    setActiveTub: (state, action: PayloadAction<number>) => {
      state.activeTab = action.payload;
      return state;
    },
    setRequestError: (state, action: PayloadAction<boolean>) => {
      state.requestError = action.payload;
      return state;
    },
  },
});

export default requestSlice.reducer;

export const {addAction, removeAction, updateAction, removeAllActions, setActiveTub, initActions, setIsFetching, setRequestError} =
  requestSlice.actions;
