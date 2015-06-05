'use strict';

import React from 'react/addons';
import SearchHeader from './SearchHeader';
import SearchResults from './SearchResults';

const PureRenderMixin = React.addons.PureRenderMixin;

export default React.createClass({
  propTypes: {
    results: React.PropTypes.array.isRequired,
  },

  mixins: [PureRenderMixin],

  renderResults(result) {
    return (
      <div key={result.get('etag')} className="search-result-item">
        <SearchHeader query={result.get('query')} />
        <SearchResults results={result.get('videos')} />
      </div>
    );
  },

  render(){
    let nodes = this.props.results.map(this.renderResults);
    return (
      <div className="search-results-container">
        {nodes}
      </div>
    );
  }
});
