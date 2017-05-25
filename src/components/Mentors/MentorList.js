import React, { Component } from 'react'
import { connect } from 'react-redux';
import Mentor from './Mentor'

const mapStateToProps = ({ mentors }) => ({mentors});

@connect(mapStateToProps)
export default class MentorList extends Component {
  render() {
    console.log('Rendering', this.props.mentors)
    return (
      <div>
      {
        this.props.mentors.map(mentor => (
          <Mentor
            key={mentor.id}
            id={mentor.id}
            name={mentor.name}
            title={mentor.title}
            />
          )
        )
      }
    </div>
    )
  }
}
