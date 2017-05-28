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
          name={user[0].user_name}
          title={user[0].job_title}
        />
        <Experience
          experience={user[0].company_name}/>
        <Education
          education={user[0].grad_year}/>
      </div>
    )
  }
}

export default Profile
