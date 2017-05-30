import React, { Component } from 'react'
import Map from '../Map/Map.js'
import { connect } from 'react-redux';
//Container for mentor result
const mapStateToProps = ({ mentors }) => ({mentors});

@connect(mapStateToProps)

class MapContainer extends Component {
  render() {
    return (
      <div>
        <Map
        mentors={this.props.mentors}/>
      </div>
    )
  }
}
export default MapContainer
