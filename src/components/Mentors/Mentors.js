import React, { Component } from 'react'
import SearchBar from '../HomePage/SearchBar'
import MentorList from './MentorList'


class Mentors extends Component {
  render() {
    const style = {
      display: 'grid'
    }
    return (
      <div style={style}>
        <SearchBar />
        <MentorList />
      </div>
    )
  }
}
export default Mentors