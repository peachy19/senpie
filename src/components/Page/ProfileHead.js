import React, { Component } from 'react'
import { userLogIn } from '../../actions/userLogIn.js';
import { connect } from'react-redux'

const mapStateToProps = (state) => {
  return {
    currentUser: state.userLogIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchMentorLogin: (id) => dispatch(dispatchMentorLogin(id))
  }
}

const dispatchMentorLogin = (id) => (dispatch) => {
 dispatch(userLogIn(id));
}


@connect(mapStateToProps,mapDispatchToProps)
class ProfileHead extends Component {

  constructor(props) {
    super(props);
    this.state = {
      connectiontStatus : 'CONNECT'
    };
  }

  componentDidMount(){
    this.socket = new WebSocket("ws://127.0.0.1:8000");
    this.props.dispatchMentorLogin(this.props.id);
    this.socket.onopen = () => {
      console.log("this socket is open");
      var message = {};
      message.sender = 2;
      message.type = 'initialize';
      this.socket.send(JSON.stringify(message));
    }
    this.socket.onmessage = (msg) => {
      var message = JSON.parse(msg.data);
      console.log('Mentor recived message', message);
      if(message.reciever === this.props.id) {
        console.log(`Mentor ${this.props.currentUser} recived a message`);
        console.log('message.content is ',message.content);
        this.setState({ connectiontStatus: message.content, requestMessage: message.requestMessage});
      }
    }
  }
  componentWillUnmount(){
      this.socket.close();
  }

  changeStatus = (event) => {
    let request = {};
    request.sender = this.props.currentUser;
    request.reciever = 1;
    request.type = 'confirm request';
    console.log('the request to be sent by mentor is ', request);
    this.socket.send(JSON.stringify(request));
    this.setState({ connectiontStatus : "confirmed", requestMessage: ''});
  }

  render() {
    return (
      <div className="panel panel-default profilehead">
        <div className="panel-body text-center">
          <img src="../../images/sample.jpeg" className="img-circle"/>
          <p className="name">{this.props.name}</p>
          <button onClick={this.changeStatus} className="btn btn-default connect-btn">{this.state.connectiontStatus}</button>
        </div>
      </div>
    )
  }
}
export default ProfileHead