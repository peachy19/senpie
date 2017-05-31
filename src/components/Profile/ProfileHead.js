import React, { Component } from 'react'

class ProfileHead extends Component {

  constructor(props) {
    super(props);
    this.state = {
      connectiontStatus : 'CONNECT'
    };
  }

  componentDidMount(){
    this.socket = new WebSocket("ws://127.0.0.1:8000");
    this.socket.onopen = () => console.log('connection is open');
    this.socket.onmessage = (msg) => {
      var message = JSON.parse(msg.data);
      console.log('student recived message', message);
      if(message.reciever === this.props.currentUser) {
        console.log(`student ${this.props.currentUser} recived a message`);
        this.setState({ connectiontStatus: message.content});
      }
    }
  }

  componentWillUnmount(){
    this.socket.close();
  }


  sendRequest = (event) => {
    let request = {};
    request.sender = this.props.currentUser;
    request.reciever = (request.sender % 2) + 1;
    const requestMessage = document.getElementById('myText').value;
    request.requestMessage = requestMessage;
    console.log('the request to be sent by student is ', request);
    this.socket.send(JSON.stringify(request));
    this.setState({ connectiontStatus: 'REQUEST SENT' });
  }

  render() {
    return (
      <div className="panel panel-default profilehead">
        <div className="panel-body text-center">
          <img src="../../images/sample.jpeg" className="img-circle"/>
          <p className="name">{this.props.name}</p>
          <button onClick={this.sendRequest} className="btn btn-default connect-btn">{this.state.connectiontStatus}</button>
          <form >
            <input type="text" id='myText' className='form-control' placeholder='input your message here'></input>
          </form>
        </div>
      </div>
    )
  }
}
export default ProfileHead