import React from 'react'
import {
  Link,
  HashRouter as Router,
} from 'react-router-dom'

const Header = () => (
  <Router>
    <div>
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button className="collapsed navbar-toggle" data-target="#bs-navbar" data-toggle="collapse" type="button">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link to="/">Senpie</Link>
          </div>{/*Navbar Header*/}
          <nav className="collapse navbar-collapse" id="bs-navbar">
            <button type="button" className="btn btn-default navbar-btn navbar-right">LOG IN</button>
            <button type="button" className="btn btn-default navbar-btn navbar-right">SIGN UP</button>
          </nav>
        </div>{/*Container Fluid*/}
      </nav>
    </div>
  </Router>
)
export default Header
