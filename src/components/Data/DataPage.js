import React, { Component } from 'react'
import RadialTidyTree from './RadialTidyTree'
import Dendrogram from './Dendrogram'
import Header from '../Header'

class DataPage extends Component {
  render() {
    return (
      <div>
      <Header
        style={{backgroundImage: 'url('+'../images/navbar-background.jpg'+')'}} />
        <div id="dendro"><Dendrogram /></div>
        <div id="radial"><RadialTidyTree /></div>
      </div>
    );
  }
}
export default DataPage
