import React,{ Component } from 'react'
import { connect } from 'react-redux'
// import search from '../actions/search'

// const mapStateToProps = (search) => ({
//  searchContent : search.content
// });

// @connect(mapStateToProps)

class SearchBar extends Component {
  render() {
    return (
      <div>
        <form onSubmit={}>
          <input type="text" value={this.props.search} />
          <input type="submit" value="Submit"  />
        </form>
      </div>
    )
  }
}
export default SearchBar