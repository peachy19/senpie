import React, { Component } from 'react'
import SearchBar from '../HomePage/SearchBar'
import MentorList from './MentorList'
import MapLink from './MapLink.js'
import Header from '../Header'


class Mentors extends Component {
  render() {
    const style = {
      display: 'grid'
    }
    return (
      <div style={style}>
        <Header
        style={{backgroundImage: 'url('+'../images/navbar-background.jpg'+')'}}/>
        <SearchBar style={{ marginTop: '100px'}} />
        <MapLink />
        <MentorList />
      </div>
    )
  }
}
export default Mentors