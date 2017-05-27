import React, { Component } from 'react'
import SearchBar from './SearchBar'

class Home extends Component {
  render() {
    const imgUrl = '../images/background-image.jpeg'
    const divStyle = {
      width: '100%',
      height: '1000px',
      backgroundImage: 'url(' + imgUrl + ')',
      backgroundSize: 'contain'
    };
    return (
      <div className='main-container' style={divStyle}>
        <SearchBar />
      </div>
    );
  }

}
export default Home