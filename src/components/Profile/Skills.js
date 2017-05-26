import React, { Component } from 'react'

class Skills extends Component {
  render(){
    const skillsList = this.props.skills.map((skill)=> <li key={skill}>{skill}</li>)
    return (
      <div>
        <div className="panel panel-default">
          <div className="panel-heading">Skills</div>
          <div className="panel-body">
            <ol>{skillsList}</ol>
          </div>
        </div>
      </div>
)
  }
}

export default Skills