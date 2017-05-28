import React, { Component } from 'react'
import { connect } from 'react-redux';
import Mentor from './Mentor'
//Container for mentor result
const mapStateToProps = ({ mentors }) => ({mentors});

@connect(mapStateToProps)
export default class MentorList extends Component {
  render() {
    console.log("Mentors", this.props.mentors);
    console.log("mentor", this.props.mentors[0])
    return (
      <div className='mentorList'>
      {
        this.props.mentors.map(mentor => (
          <Mentor
            key={this.props.mentors.indexOf(mentor)}
            id={this.props.mentors.indexOf(mentor)}
            name={mentor[0].user_name}
            title={mentor[0].job_title}
          />
        ))
      }
    </div>
    )
  }
}
