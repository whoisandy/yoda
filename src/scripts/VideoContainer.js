'use strict';

import React from 'react';

export default React.createClass({
  render() {
    return (
      <div className="video-container">
        <h4>Video page here</h4>
        <p>{this.props.params.video.id}</p>
      </div>
    );
  }
});