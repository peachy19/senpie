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
      connectiontStatus : 'New Request',
    };
  }

  componentDidMount(){
    this.socket = new WebSocket("ws://127.0.0.1:7000");
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
      console.log('message.content is ',message.content);
      document.getElementById("modal-message").value = message.requestMessage;
      console.log("P text", document.getElementById("modal-message").value )
      if(message.reciever == this.props.id){
        console.log(`Mentor ${this.props.currentUser} recived a message`);
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
     const num = Math.floor(Math.random() * (8 - 1) + 1);

    console.log("Number", num);
    const imageCat = `../../images/${num}.jpeg`
    return (
      <div className="panel panel-default profilehead">
        <div className="panel-body text-center">
          <img src={imageCat} height="200" width="200" className="img-circle"/>
          <p className="name">{this.props.name}</p>
          <button className="btn btn-default connect-btn" data-toggle="modal" data-target="#myModal">{this.state.connectiontStatus}</button>

          <div id="myModal" className="modal fade" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <h4 className="modal-title">New Requests</h4>
                </div>
                <div className="modal-body">
                <p id="sender">Prachi sent you a connection request</p>
                <p id="modal-message">Please add me</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default modal-button-close" data-dismiss="modal">Decline</button>
                  <button onClick={this.changeStatus} type="button" className="btn btn-primary modal-button-send" data-dismiss="modal">Accept</button>
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