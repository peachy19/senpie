import React, { Component } from 'react'
import RadialTidyTree from './RadialTidyTree'
import Dendrogram from './Dendrogram'

class DataPage extends Component {
  render() {
    return (
      <div>
        <div id="dendro"><Dendrogram /></div>
        <div id="radial"><RadialTidyTree /></div>
      </div>
    );
  }
}
export default DataPage
