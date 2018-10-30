/* eslint-disable import/no-extraneous-dependencies */

import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from './reducers';
import middleware from './middleware';

const store = createStore(reducer, composeWithDevTools(middleware));

export default store;

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./reducers', () => {
    store.replaceReducer(reducer);
  });
}
