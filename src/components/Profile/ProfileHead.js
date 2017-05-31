import React, { Component } from 'react'

class ProfileHead extends Component {
  render() {
    return (
      <div className="panel panel-default profilehead">
        <div className="panel-body text-center">
          <img src="../../images/sample.jpeg" className="img-circle"/>
          <p className="name">{this.props.name}</p>
          <button className="btn btn-default connect-btn">CONNECT</button>
        </div>
      </div>
    )
  }
}
export default ProfileHead