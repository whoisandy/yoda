'use strict';

import React from 'react';

export default React.createClass({
  render() {
    console.log(this.props.params.video);
    return (
      <div className="video-handler">
        <h2>Video page</h2>
      </div>
    );
  }
});