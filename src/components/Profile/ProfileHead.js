import React, { Component } from 'react'

class ProfileHead extends Component {

  constructor(props) {
    super(props);
    this.state = {
      connectiontStatus : 'Connect'
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
    event.preventDefault;
    let request = {};
    request.sender = this.props.currentUser;
    //request.reciever = (request.sender % 2) + 1;
    request.reciever = this.props.id;
    const requestMessage = document.getElementById('myText').value;
    request.requestMessage = requestMessage;
    console.log('the request to be sent by student is ', request);
    this.socket.send(JSON.stringify(request));
    this.setState({ connectiontStatus: 'REQUEST SENT' });
    console.log('new this.state is', this.state);
  }

  render() {
    return (
      <div className="panel panel-default profilehead">
        <div className="panel-body text-center">
          <img src="../../images/sample.jpeg" className="img-circle"/>
          <p className="name">{this.props.name}</p>
          <button className="btn btn-default connect-btn" data-toggle="modal" data-target="#myModal">{this.state.connectiontStatus}</button>

          <div id="myModal" className="modal fade" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <h4 className="modal-title">Notice me Senpai </h4>
                </div>
                <div className="modal-body">
                  <form id="modal-form">
                    <input id='myText' type='text'/>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default modal-button-close" data-dismiss="modal">Close</button>
                  <button onClick={this.sendRequest} type="button" className="btn btn-primary modal-buton-send" data-dismiss="modal">Send</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default ProfileHead