import React from 'react'
import {
  HashRouter as Router,
  Link
} from 'react-router-dom'

const Header = () => (
  <Router>
    <div>
      <nav>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/mentors">Mentors</Link></li>
        <li><Link to="/user/:id">User</Link></li>
      </nav>
    </div>
  </Router>
)
export default Header
