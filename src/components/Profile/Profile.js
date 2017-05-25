import React, { Component } from 'react'
import ProfileHead from './ProfileHead'
import Skills from './Skills'
import Experience from './Experience'
import Education from './Education'

class Profile extends Component {

  //const id = this.props.params.id;

  render() {
    return (
      <div>
        <ProfileHead />
        <Skills />
        <Experience />
        <Education />
      </div>
    )
  }
}

export default Profile
