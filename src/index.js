// Application entrypoint.
// Load up the application styles
import { BrowserRouter } from 'react-router-dom'
require('../styles/application.scss');

import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import Header from './components/Header'
import reducer from './reducers'

const store = createStore(reducer)

render(
  <BrowserRouter>
    <Provider store={store}>
      <div>
        <Header />
        <App />
      </div>
    </Provider>
  </BrowserRouter>,
  document.getElementById('react-root')
)
