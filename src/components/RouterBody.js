import React from 'react'
import {
  HashRouter as Router,
  Route,
} from 'react-router-dom'

import Profile from './Profile/Profile'
import Mentors from './Mentors/Mentors'
import Home from './HomePage/Home'
import MapContainer from './Map/MapContainer'


const RouterBody = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home}/>
      <Route path="/mentors" component={Mentors}/>
      <Route exact path="/user/:id" component={Profile}/>
      <Route path="/map" component={MapContainer}/>
    </div>
  </Router>
)



export default RouterBody
