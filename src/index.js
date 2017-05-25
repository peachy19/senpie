require('../styles/application.scss');


import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import * as reducers from './reducers'



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [];

const store = createStore(
  combineReducers({
    ...reducers,
  }),
  window.__DEFAULT_STATE__ || {},
  composeEnhancers(applyMiddleware(...middlewares))
);

window.store = store;  // hacky global shit, do not leave this in

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('react-root')
)
