import React, { Component } from 'react'
import { connect } from 'react-redux';
import {
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
  constructor(props) {
    super(props);
  }

 // sendMessage = (event) => {
 //    console.log('send message button was pressed');
 //    event.preventDefault;
 //    var data = {};
 //    data.type = 'connect';
 //    this.socket.send(JSON.stringify(data));
 //  }

 //  componentDidMount() {
 //    const websocket = new WebSocket("ws://127.0.0.1:8080");
 //    this.socket = websocket;
 //    this.socket.onopen = () => console.log('socket is connected');
 //    console.log("componentDidMount")
 //    this.socket.onmessage = (data) => {
 //      console.log('a message is recieved on the client side');
 //      let msg = JSON.parse(event.data);
 //      console.log(msg);
 //    }
 //  }

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