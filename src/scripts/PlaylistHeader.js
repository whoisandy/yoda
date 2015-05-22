'use strict';

import React from 'react';

export default React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired
  },

  render() {
    return (
      <div className="playlist-header">
        <h3><a href="#">{this.props.title}</a></h3>
      </div>
    );
  }
});
