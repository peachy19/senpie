import React from 'react'
import Header from './Header'
import Footer from './Footer'
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const App = () => (
  <Router>
    <div>
      <Header/>
      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/topics" component={Topics}/>
      <Footer/>
    </div>
  </Router>
)

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
  </div>
)

export default App

// const App = () => (
//   <div>
//     <h1>Hello Ben</h1>
//     <Footer />
//   </div>
// )
//
// export default App
