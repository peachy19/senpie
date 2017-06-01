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
    const num = Math.floor(Math.random() * (8 - 1) + 1);

    console.log("Number", num);
    console.log('key is',this.props.key);
    const imageCat = `../../images/${num}.jpeg`
    return (
      <Link to={`/user/${this.props.id}`} >
      <div className="panel panel-default mentor" style={panelStyle}>
        <div style={divStyle}>
          <img src={imageCat} height="70" width="70" className="img-circle" style={image}/>
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