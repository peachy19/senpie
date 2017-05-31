import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProfileHead from './ProfileHead';
import Skills from './Skills';
import Experience from './Experience';
import Education from './Education';

const mapStateToProps = ({mentors, userLogIn}, ownProps) => {
  const { id } = ownProps.match.params;
  const currentUser = userLogIn.id
  return {
    mentors,
    id,
    currentUser
  }
};


@connect(mapStateToProps)
class Profile extends Component {
  render() {
    console.log("logged in user is", this.props.currentUser);
    let user = {};
    this.props.mentors.forEach((mentor) => {
      if(mentor[0].id == this.props.id){
        user = mentor[0];
      }
    })
    return (
      <div>
        <ProfileHead
          name={user.user_name}
          title={user.job_title}
          id={this.props.id}
          currentUser={this.props.currentUser}
        />
        <Experience
          experience={user.company_name}/>
        <Education
          education={user.grad_year}/>
      </div>
    )
  }
}

export default Profile
