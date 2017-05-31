require('../styles/application.scss');

import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import * as reducers from './reducers'
import thunk from 'redux-thunk';
import logger from 'redux-logger';

//Appending formReducer to the object of other reducers
const reducer = combineReducers({...reducers});
const store = compose(applyMiddleware(thunk, logger))(createStore)(reducer);

const websocket = new WebSocket("ws://localhost:8000");

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('react-root')
)

