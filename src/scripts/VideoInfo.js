'use strict';

import React from 'react';

export default React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired
  },

  render() {
    return (
      <div className="video-info">
        <p className="title">{this.props.title}</p>
        <p className="views">{this.props.viewCount}</p>
      </div>
    );
  }
});