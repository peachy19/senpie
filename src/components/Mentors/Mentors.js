import React, { Component } from 'react'
import SearchBar from '../HomePage/SearchBar'
import MentorList from './MentorList'
import MapLink from './MapLink.js'


class Mentors extends Component {
  render() {
    const style = {
      display: 'grid'
    }
    return (
      <div style={style}>
        <SearchBar />
        <MapLink />
        <MentorList />
      </div>
    )
  }
}
export default Mentors