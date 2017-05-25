import React,{ Component } from 'react'
import { connect } from 'react-redux'
import { searchAndGetResults } from '../actions/search.js'

const mapStateToProps = (state) => ({
  searchBar : state
});

const mapDispatchToProps = {
  dispatchSearchAndGetResults: searchAndGetResults
};

@connect(mapStateToProps, mapDispatchToProps)
export default class SearchBar extends Component {
  sendFetchRequest = (e) => {
    e.preventDefault();
    const searchTerm = document.getElementById("myText").value;
    this.props.dispatchSearchAndGetResults(searchTerm);
  }

  render() {
    return (
    <div>
      <label> {this.props.searchBar} </label>
      <form onSubmit={this.sendFetchRequest}>
        <input type="text" id='myText'/>
        <input type="submit" value="Submit"  />
      </form>
    </div>
    );
  }
}