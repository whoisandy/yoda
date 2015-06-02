'use strict';

import React from 'react';

export default React.createClass({
  propTypes: {
    query: React.PropTypes.string.isRequired
  },

  render() {
    var title = 'Search results: ' + this.props.query;
    return (
      <div className="search-results-header">
        <h3>{title}</h3>
      </div>
    );
  }
});
