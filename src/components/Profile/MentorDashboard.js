import React, { Component } from 'react';
import { connect } from 'react-redux';


const mapStateToProps = ({userLogIn}) => {
  const currentUser = userLogIn.id
  return {
    currentUser
  }
}

@connect(mapStateToProps)
class MentorDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connectiontStatus : 'CONNECT',
      requestMessage : ''
    };
  }

  componentDidMount(){
    this.socket = new WebSocket("ws://127.0.0.1:8000");
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
      if(message.reciever === 2) {
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
      <div className="panel panel-default">
        <div className="panel-body text-center">
          <button onClick={this.changeStatus} className="btn btn-default">{this.state.connectiontStatus}</button>
          <label> {this.state.requestMessage} </label>
        </div>
      </div>
    )
  }

}
export default MentorDashboard