import React from 'react'
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Profile from './Profile/Profile'
import Mentors from './Mentors/Mentors'
import Home from './HomePage/Home'

const RouterBody = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home}/>
      <Route path="/mentors" component={Mentors}/>
      <Route exact path="/user/:id" component={Profile}/>
    </div>
  </Router>
)



export default RouterBody
