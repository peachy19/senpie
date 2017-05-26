import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProfileHead from './ProfileHead';
import Skills from './Skills';
import Experience from './Experience';
import Education from './Education';

const mapStateToProps = ({mentors}, ownProps) => {
  const { id } = ownProps.match.params;
  return {
    mentors,
    id
  }

};

@connect(mapStateToProps)
class Profile extends Component {
  render() {
    const user = this.props.mentors[this.props.id];
    return (
      <div>
        <ProfileHead
          name={user.name}
          title={user.title}
        />
        <Skills
          skills={user.skills}/>
        <Experience
          experience={user.experience}/>
        <Education
          education={user.education}/>
      </div>
    )
  }
}

export default Profile
