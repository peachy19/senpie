import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class MapLink extends Component {
  render() {
    return (
      <Link to= {`/map`} >
      <img src="../../images/google-map.png" height="70" width="70"/>
      <p> View on Map</p>
      </Link>
    )
  }
}

export default MapLink

