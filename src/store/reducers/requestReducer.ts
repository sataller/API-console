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
};

type DataListType = {
  [key: string]: DataItemType;
};

type DataItemType = {
  request: any;
  response: any;
  status: string;
};

const newField = {
  request: {
    action: 'new field',
  },
  response: {},
  status: '',
};

const initialState: StateType = {
  data: {
    dataList: {
      '0': newField,
    },
    maxLength: 0,
  },
  responseError: false,
  requestError: false,
  isFetching: false,
};

const requestSlice = createSlice({
  name: 'requestSlice',
  initialState,
  reducers: {
    initActions: (state) => {
      const actions = localStorage.getItem('userActions');
      state = actions ? JSON.parse(actions) : initialState;
      return state;
    },
    addAction: (state, action: PayloadAction<{data: DataItemType; status: string}>) => {
      const key = state.data.maxLength >= 20 ? 20 : state.data.maxLength + 1;
      state.responseError = action.payload.data.status === Status.ERROR;
      state.data.dataList[key - 1] = action.payload.data;
      state.data.dataList[key] = newField;
      state.data.maxLength = key;
      localStorage.setItem('userActions', JSON.stringify(state));
      return state;
    },
    setIsFetching: (state, action: PayloadAction<boolean>) => {
      state.isFetching = action.payload;
      return state;
    },
    setAction: (state) => {
      const actions = localStorage.getItem('userActions');
      state = actions ? JSON.parse(actions) : {};
      return state;
    },
    removeAction: (state, action: PayloadAction<{id: string}>) => {
      const newData: DataListType = {};
      let removed = false;
      for (let key in state.data.dataList) {
        removed = key === action.payload.id;
        removed ? (newData[`${+key - 1}`] = state.data.dataList[key]) : (newData[`${+key}`] = state.data.dataList[key]);
      }
      state.data.dataList = newData;
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
    setResponseError: (state, action: PayloadAction<boolean>) => {
      state.responseError = action.payload;
      return state;
    },
    setRequestError: (state, action: PayloadAction<boolean>) => {
      state.requestError = action.payload;
      return state;
    },
  },
});

export default requestSlice.reducer;

export const {
  addAction,
  setAction,
  removeAction,
  updateAction,
  removeAllActions,
  setResponseError,
  initActions,
  setIsFetching,
  setRequestError,
} = requestSlice.actions;
