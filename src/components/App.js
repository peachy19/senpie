import React, { Component } from 'react'
import Footer from './Footer'
import RouterBody from './RouterBody'

class App extends Component {
  render() {
    return (
      <div>
        <RouterBody/>
        <Footer/>
      </div>
    )
  }
}

export default App
