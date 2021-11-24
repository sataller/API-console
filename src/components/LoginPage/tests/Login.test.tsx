import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import App from '../../../App';
import React from 'react';
import configureStore from 'redux-mock-store';
import {StoreType} from '../../../store/store';

const mockStore = configureStore([]);
let store: StoreType;
let component;
beforeEach(() => {
  store = mockStore({
    auth: {
      token: '',
      user: {
        login: '',
        sublogin: '',
      },
      isFetching: false,
      isAuth: true,
      error: false,
      errorText: '',
    },
    request: {
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
    },
  });
});

describe('App', () => {
  it('render login page', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const isAuth = true;
    const linkElement = screen.getByText(/Форматировать/i);
    expect(linkElement).toBeInTheDocument();
  });
});
