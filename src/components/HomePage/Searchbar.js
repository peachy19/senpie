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
    marginTop: '40px'
  }
  dispatch(updateSearchbar(query, style));

  axios.get(`http://localhost:8080/search/${query}`)
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
  // constructor(props) {
  //   super(props);
  //   this.handleChange = this.handleChange.bind(this);
  // }
  // handleChange(event){
  //   this.setState({this.props.searchbar.text: event.target.value});
  // }
  render() {
    return (
    <div>
      <div className="col-lg-3"></div>
      <div className="col-lg-6">
        <form onSubmit={this.props.dispatchSearchAndGetResults} style = {this.props.searchbar.style}>
          <input type="text" id='myText' className='form-control' placeholder={this.props.searchbar.text} onChange={this.handleChange}></input>
          <input type="submit" value="Search" className="btn btn-default"></input>
        </form>
        </div>
      </div>
    );
  }
}
