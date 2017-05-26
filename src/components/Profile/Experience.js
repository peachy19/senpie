import React, { Component } from 'react'

class Experience extends Component{
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">Experience</div>
        <div className="panel-body">{this.props.experience}</div>
      </div>
    )
  }
}
export default Experience