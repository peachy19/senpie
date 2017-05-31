import React, { Component } from 'react'
import SearchBar from './SearchBar'
import Tagline from './Tagline'
import Header from '../Header.js'

class Home extends Component {
  render() {
    const imgUrl = '../images/senpie_wallpaper.jpg'
    const divStyle = {
      width: '100%',
      height: '1000px',
      backgroundImage: 'url(' + imgUrl + ')',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover'
    };
    return (
      <div className='main-container' style={divStyle}>
        <Header />
        <Tagline />
        <SearchBar />
      </div>
    );
  }

}
export default Home