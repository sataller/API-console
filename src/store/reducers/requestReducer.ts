import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Status, StatusType} from '../../api/api';

type StateType = {
  data: {
    dataList: DataListType;
    maxLength: number;
  };
  responseError: boolean;
  isRequestError: boolean;
  isFetching: boolean;
  activeTab: number | null;
  userName: string;
  newRequestText: string;
};

type DataListType = {
  [key: string]: DataItemType;
};

export type DataItemType = {
  request: any;
  response: any;
  status: StatusType;
  requestStatus: StatusType;
};

const initialState: StateType = {
  data: {
    dataList: {},
    maxLength: 20,
  },
  responseError: false,
  isRequestError: false,
  isFetching: false,
  activeTab: null,
  userName: '',
  newRequestText: '',
};

const requestSlice = createSlice({
  name: 'requestSlice',
  initialState,
  reducers: {
    initActions: (state, action: PayloadAction<{userName: string}>) => {
      const actions = localStorage.getItem(`${action.payload.userName}_Actions`);
      state.userName = action.payload.userName;
      state.data = initialState.data;
      if (!actions) return;
      const parsActions = JSON.parse(actions);
      state.newRequestText = parsActions.newRequestText;
      state.data = parsActions.data;
      return state;
    },
    addAction: (state, action: PayloadAction<{data: DataItemType}>) => {
      state.responseError = action.payload.data.status === Status.ERROR;
      const newAction = {
        response: action.payload.data.response,
        request: JSON.stringify(action.payload.data.request, null, 2),
        status: action.payload.data.status,
        requestStatus: Status.OK,
      };
      if (state.data.maxLength > 0) {
        let key = (state.data.maxLength = state.data.maxLength - 1);
        state.data.dataList[key] = newAction;
        state.activeTab = key;
      } else {
        const lastKey = Object.keys(state.data.dataList).length - 1;
        let data = JSON.parse(JSON.stringify(state.data.dataList));
        const newData: DataListType = {
          '0': newAction,
        };
        for (let key in data) {
          if (+key !== lastKey) {
            newData[+key + 1] = data[key];
          }
        }
        state.data.dataList = newData;
        state.activeTab = 0;
      }
      localStorage.setItem(`${state.userName}_Actions`, JSON.stringify(state));
      return state;
    },
    updateAction: (state, action: PayloadAction<{id: string; data: {data: DataItemType}}>) => {
      state.data.dataList[action.payload.id] = action.payload.data.data;
      localStorage.setItem(`${state.userName}_Actions`, JSON.stringify(state));
      return state;
    },
    setIsFetching: (state) => {
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
      localStorage.setItem(`${state.userName}_Actions`, JSON.stringify(state));
      return state;
    },
    removeAllActions: (state) => {
      state.data.dataList = initialState.data.dataList;
      localStorage.setItem(`${state.userName}_Actions`, JSON.stringify(state));
      return state;
    },
    setActiveTub: (state, action: PayloadAction<number>) => {
      state.activeTab = action.payload;
      state.isRequestError = state.data.dataList[action.payload].requestStatus === Status.ERROR;

      return state;
    },
    setRequestError: (state, action: PayloadAction<{activeId: string; isError: StatusType}>) => {
      state.isRequestError = action.payload.isError === Status.ERROR;
      if (!+action.payload.activeId) return;
      state.data.dataList[action.payload.activeId].requestStatus = action.payload.isError;
      localStorage.setItem(`${state.userName}_Actions`, JSON.stringify(state));

      return state;
    },
    setRequestText: (state, action: PayloadAction<{activeId?: string; text: string}>) => {
      state.newRequestText = action.payload.text;
      localStorage.setItem(`${state.userName}_Actions`, JSON.stringify(state));
      return state;
    },
    changeRequestText: (state, action: PayloadAction<{id: string; newText: string}>) => {
      const isExists = state.data.dataList.hasOwnProperty(action.payload.id);
      if (isExists) {
        state.data.dataList[action.payload.id].request = action.payload.newText;
        localStorage.setItem(`${state.userName}_Actions`, JSON.stringify(state));
      }
      return state;
    },
    removeAllRequests: (state) => {
      localStorage.setItem(`${state.userName}_Actions`, JSON.stringify(initialState));
      state = initialState;
      return state;
    },
  },
});

export default requestSlice.reducer;

export const {
  addAction,
  removeAction,
  updateAction,
  removeAllActions,
  setActiveTub,
  initActions,
  setIsFetching,
  setRequestError,
  changeRequestText,
  removeAllRequests,
  setRequestText,
} = requestSlice.actions;
