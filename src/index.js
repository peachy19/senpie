require('../styles/application.scss');

import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import searchReducer from './reducers/search'
import thunk from 'redux-thunk';

console.log('searchReducer is ',searchReducer);
const store = createStore(
  searchReducer,
  applyMiddleware(thunk)
);

render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('react-root')
)
