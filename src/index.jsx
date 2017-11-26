import ReactDOM from 'react-dom';
import React from 'react';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import '../styles/styles.scss';
import { rootReducer } from './core/reducers/reducers';
import App from './components/app.jsx';

let store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));
