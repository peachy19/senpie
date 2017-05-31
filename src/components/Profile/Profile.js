import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProfileHead from './ProfileHead';
import Header from '../Header'
import Skills from './Skills';
import Experience from './Experience';
import Education from './Education';
import Description from './Description';

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
        <Header
        style={{backgroundImage: 'url('+'../images/navbar-background.jpg'+')'}}/>
        <ProfileHead
          name={user[0].user_name}
          title={user[0].job_title}
        />
        <Description
          description={user[0].description}/>
        <Experience
          title = {user[0].job_title}
          experience={user[0].company_name}/>
        <Skills
        skills={user[0].languages}/>
        <Education
          education={user[0].grad_year}/>
      </div>
    )
  }
}

export default Profile
