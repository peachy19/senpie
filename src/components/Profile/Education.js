import React, { Component } from 'react'

class Education extends Component{
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">Education</div>
        <div className="panel-body">{this.props.education}</div>
      </div>
    )
  }
}
export default Education