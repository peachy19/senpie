import React, { Component } from 'react'

class ProfileHead extends Component {
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-body text-center">
          <img src="../../images/sample.jpeg" className="img-circle"/>
          <p>{this.props.name}</p>
          <p>{this.props.title}</p>
          <button className="btn btn-default">CONNECT</button>
        </div>
      </div>
    )
  }
}
export default ProfileHead