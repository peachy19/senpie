require('../styles/application.scss');

import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import searchReducer from './reducers/search'

const store = createStore( searchReducer )

render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('react-root')
)
