'use strict';

import React from 'react';
import Video from './Video';

export default React.createClass({
  propTypes: {
    results: React.PropTypes.array.isRequired
  },

  renderResult(result) {
    return (
      <Video key={Math.random()} video={result} />
    );
  },

  render() {
    let nodes = this.props.results.map(this.renderResult);
    return (
      <div className="search-results-videos">
        {nodes}
      </div>
    );
  }
});
