import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Mentor extends Component {
  render() {
    return (
      <Link to={`/user/${this.props.id}`} >
      <div >
        <img src="../../images/sample.jpeg" className="img-circle"/>
        <span>{this.props.name}</span>
        <span>{this.props.title}</span>
      </div>
      </Link>
    )
  }
}

export default Mentor