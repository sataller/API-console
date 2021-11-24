import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './App';
import store from './store/store';
import {Provider} from 'react-redux';

// test('renders learn react link', () => {
//   render(
//     <Provider store={store}>
//       <App />
//     </Provider>
//   );
//
//   const linkElement = screen.getByText(/API-консолька/i);
//   expect(linkElement).toBeInTheDocument();
// });

describe('App', () => {
  it('render login page', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const linkElement = screen.getByText(/API-консолька/i);
    expect(linkElement).toBeInTheDocument();
  });
});
