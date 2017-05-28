require('../styles/application.scss');

import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import * as reducers from './reducers'
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { reducer as formReducer } from 'redux-form';

//Appending formReducer to the object of other reducers
const reducer = combineReducers(Object.assign({formReducer},{...reducers}));
const store = compose(applyMiddleware(thunk, logger))(createStore)(reducer);

render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('react-root')
)

