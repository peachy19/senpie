import React, { Component } from 'react'
import Map from '../Map/Map.js'
import Header from '../Header'
import { connect } from 'react-redux';
//Container for mentor result
const mapStateToProps = ({ mentors }) => ({mentors});

@connect(mapStateToProps)

class MapContainer extends Component {
  render() {
    return (
      <div>
        <Header />
        <Map
        mentors={this.props.mentors}/>
      </div>
    )
  }
}
export default MapContainer
