import React from 'react'
import {
  HashRouter as Router,
  Route
} from 'react-router-dom'
import Profile from './Profile/Profile'
import Mentors from './Mentors/Mentors'

const RouterBody = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home}/>
      <Route path="/mentors" component={Mentors}/>
      <Route exact path="/user/:id" component={Profile}/>
    </div>
  </Router>
)

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)




export default RouterBody
