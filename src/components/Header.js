import React from 'react'
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const Header = () => (
  <Router>
    <div>
      <nav>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/topics">Topics</Link></li>
      </nav>
    </div>
  </Router>
)
export default Header
