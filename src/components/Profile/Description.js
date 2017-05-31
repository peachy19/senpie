import React, { Component } from 'react'

class Experience extends Component{
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">About me</div>
        <div className="panel-body">{this.props.description}</div>
      </div>
    )
  }
}
export default Experience