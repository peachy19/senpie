import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Mentor extends Component {
  render() {
    const panelStyle = {
      height: '100px',
      width: '70%',
      margin: '50px'
    }
    const divStyle = {
      margin: '15px'
    }
    const image = {
      float: 'left'
    }
    const info = {
      padding: '10px',
      marginLeft: '10px',
      float: 'left'
    }
    console.log('key is',this.props.key);
    return (
      <Link to={`/user/${this.props.id}`} >
      <div className="panel panel-default mentor" style={panelStyle}>
        <div style={divStyle}>
          <img src="../../images/sample.jpeg" height="70" width="70" className="img-circle" style={image}/>
          <div style={info} >
          <p>{this.props.name}</p>
          <p className>{this.props.company}, {this.props.title}</p>
          </div>
        </div>
      </div>
      </Link>
    )
  }
}

export default Mentor