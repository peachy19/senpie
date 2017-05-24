import React from 'react'
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const RouterBody = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/topics" component={Topics}/>
      <Route path="/mentors" component={Mentors}/>
    </div>
  </Router>
)

const Home = () => (
  <div>
    <h2>Home</h2>
    <li><Link to="/mentors">See Mentors</Link></li>
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

const Mentors = () => (
  <dl><dt><img src="https://placekitten.com/g/200/300"/></dt>
  <dt>Name</dt><dd>Joe Smith</dd></dl>

)

export default RouterBody
