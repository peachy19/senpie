import React, {Component} from 'react'
import {
  Link,
  HashRouter as Router,
} from 'react-router-dom'

class Header extends Component {
 render() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-default" style={this.props.style}>
          <div className="container-fluid">
            <div className="navbar-header">
              <button className="collapsed navbar-toggle" data-target="#bs-navbar" data-toggle="collapse" type="button">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link to="/">Senpie</Link>
            </div>{/*Navbar Header*/}
            <p className="navbar-text data"><a href="/#/data" className="navbar-link">Data</a></p>
            <nav className="collapse navbar-collapse" id="bs-navbar">
              <button type="button" className="btn btn-default navbar-btn navbar-right">Login</button>
              <button type="button" className="btn btn-default navbar-btn navbar-right">Sign up</button>
            </nav>
          </div>{/*Container Fluid*/}
        </nav>
      </div>
    </Router>
  )
}
}
export default Header
