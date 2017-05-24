import React,{ Component } from 'react'
import { connect } from 'react-redux'
import { search } from '../actions/search.js'

const mapStateToProps = (state) => ({
  searchBar : state.searchBar
});

const mapDispatchToProps = {
  dispatchSearch: search
};

@connect(mapStateToProps, mapDispatchToProps)
export default class SearchBar extends Component {
  sendFetchRequest = (e) => {
    e.preventDefault();
    const searchTerm = document.getElementById("myText").value;
    this.props.dispatchSearch(searchTerm);
  }

  render() {
    return (
    <div>
      <form onSubmit={this.sendFetchRequest}>
        <input type="text" id='myText' value={this.props.searchBar} />
        <input type="submit" value="Submit"  />
      </form>
    </div>
    );
  }
}