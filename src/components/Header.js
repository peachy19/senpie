import React, { Component } from 'react'
import { connect } from 'react-redux';
import {
  Link,
  HashRouter as Router,
} from 'react-router-dom'
import { userLogIn, mentorLogin } from '../actions/userLogIn.js';

const logInProtege = ( e ) => {
  e.preventDefault();
}

const mapStateToProps = (state) => {
  return {
    id: 'temp'
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    studentLogIn : (e) => {
      console.log('student logged in');
      e.preventDefault;
      dispatch(userLogIn(1));
    },
    mentorLogin  : (e) => {
      console.log('mentor logged in');
      e.preventDefault;
      dispatch(userLogIn(2));
    }
  }
}

@connect(mapStateToProps,mapDispatchToProps)
export default class Header extends Component {
  render() {
    return (
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
                Senpie
              </div>{/*Navbar Header*/}
              <nav className="collapse navbar-collapse" id="bs-navbar">
                <button type="button" className="btn btn-default navbar-btn navbar-right" onClick={this.props.studentLogIn}>LOG IN</button>
                <button type="button" className="btn btn-default navbar-btn navbar-right" onClick={this.props.mentorLogin}>SIGN UP</button>
              </nav>
            </div>{/*Container Fluid*/}
          </nav>
        </div>
      </Router>
      )
  }
}