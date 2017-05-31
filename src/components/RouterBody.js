import React from 'react'
import {
  HashRouter as Router,
  Route,
} from 'react-router-dom'

import Profile from './Profile/Profile'
import Mentors from './Mentors/Mentors'
import Home from './HomePage/Home'
import MapContainer from './Map/MapContainer'
import DataPage from './Data/DataPage'
import MentorDashboard from './Profile/MentorDashboard'

const RouterBody = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home}/>
      <Route path="/mentors" component={Mentors}/>
      <Route exact path="/user/:id" component={Profile}/>
      <Route path="/map" component={MapContainer}/>
      <Route path="/data" component={DataPage}/>
      <Route path="/mentorDashboard" component={MentorDashboard}/>
    </div>
  </Router>
)

export default RouterBody
