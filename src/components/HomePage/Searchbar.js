import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { handleResponse } from '../../actions/get_mentors.js';
import { updateSearchbar } from '../../actions/searchbar_update.js';
import axios from 'axios';

function mapStateToProps(state){
  return {
    searchbar: state.searchbar
  }

}
const mapDispatchToProps = (dispatch) => {
  return {
    dispatchSearchAndGetResults: (e) => dispatch(dispatchSearchAndGetResults(e))
  }
};
const dispatchSearchAndGetResults = (e)  => (dispatch) => {
  e.preventDefault();
  console.log('a search is fired from client');
  const query = document.getElementById('myText').value;
  const style = {
    marginTop: '100px'
  }
  dispatch(updateSearchbar(query));
  console.log('I am in dispatch search');
  axios.get(`http://localhost:8000/search/${query}`)
    .then(function(response) {
      console.log('Response is', response);
      window.location = '#/mentors'
      dispatch(handleResponse(response.data));
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
        <form className="search" onSubmit={this.props.dispatchSearchAndGetResults} style={this.props.style}>
          <input type="text" id='myText' className='form-control' defaultValue={this.props.searchbar.text} />
          <input type="submit" value="GO" className="btn btn-default"/>
        </form>
        </div>
      </div>
    );
  }
}
