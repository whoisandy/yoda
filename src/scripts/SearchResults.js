'use strict';

import React from 'react';
import Video from './Video';

export default React.createClass({
  propTypes: {
    results: React.PropTypes.array.isRequired
  },

  render() {
    let nodes = this.props.results.map(result => {
      return (<Video key={result.id} video={result} />);
    });

    return (
      <div className="search-results-videos">
        {nodes}
      </div>
    );
  }
});