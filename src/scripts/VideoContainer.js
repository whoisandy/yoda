'use strict';

import React from 'react';
import {State} from 'react-router';
import VideoFrame from './VideoFrame';
import VideoInfo from './VideoInfo';

export default React.createClass({
  mixins: [State],

  render() {
    var props = this.getQuery();
    return (
      <div className="video-container">
        <VideoFrame video={this.props.params.video} />
        <VideoInfo {...props} />
      </div>
    );
  }
});