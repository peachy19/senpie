import React, {Component} from 'react';
import { Link } from 'react-router-dom';
// <Link to={`/mentors/${id}`}>Pick Mentor</Link>
//import { browserHistory } from 'react-router';

class Mentor extends Component {
  render() {
    return (
      <Link to={`/user/${this.props.id}`} >
      <div >
        <img src="../../img/sample.jpeg" className="img-circle"/>
        <span>{this.props.name}</span>
        <span>{this.props.title}</span>
      </div>
      </Link>
    )
  }
}

export default Mentor