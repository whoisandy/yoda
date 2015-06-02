'use strict';

import React from 'react';
import SearchHeader from './SearchHeader';
import SearchResults from './SearchResults';

export default React.createClass({
  propTypes: {
    query: React.PropTypes.string.isRequired
  },

  render(){
    return (
      <div className="search-results">
        <SearchHeader query={this.props.query} />
        <SearchResults results={this.props.results} />
      </div>
    );
  }
});
