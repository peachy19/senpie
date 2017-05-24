require('../styles/application.scss');

import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import /* reducer */ from 'reducer'

store = createStore(  )

render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('react-root')
)
