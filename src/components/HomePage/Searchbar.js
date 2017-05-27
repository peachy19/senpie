import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { handleResponse } from '../../actions/mentors.js';
import { updateSearchbar } from '../../actions/searchbar_update.js';
import axios from 'axios';

const mapStateToProps = ({searchbarText}) => {
  searchbarText
};
const mapDispatchToProps = (dispatch) => {
  return {
    dispatchSearchAndGetResults: (e) => dispatch(dispatchSearchAndGetResults(e))
  }
};
const dispatchSearchAndGetResults = (e)  => (dispatch) => {
  e.preventDefault();
  window.location = '#/mentors'
  const query = document.getElementById('myText').value;
  dispatch(updateSearchbar(query));

  axios.get(`http://localhost:8080/search/${query}`)
    .then(function(response) {
      console.log('Response is', response);
      dispatch(handleResponse(response.data.data));
    }).catch(function(error) {
      console.log(error);
    });
  }

@connect(mapStateToProps, mapDispatchToProps)
export default class SearchBar extends Component {
  render() {
    return (
    <div>
      <div className="col-lg-3"></div>
      <div className="col-lg-6">
        <form onSubmit={this.props.dispatchSearchAndGetResults}>
          <input type="text" id='myText' className='form-control' value={this.props.searchbarText}></input>
          <input type="submit" value="Submit" className="btn btn-default"></input>
        </form>
        </div>
      </div>
    );
  }
}
