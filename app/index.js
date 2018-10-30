import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/main.scss';
import { Provider } from 'react-redux';
import store from './store.config';
import ConnectedApp from './components/app';

const rootElement = document.getElementById('app');

const renderApp = () => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedApp />
    </Provider>,
    rootElement
  );
};

renderApp();

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./components/app', () => {
    renderApp();
  });
}
