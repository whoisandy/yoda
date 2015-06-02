'use strict';

import React from 'react';
import Video from './Video';

export default React.createClass({
  propTypes: {
    videos: React.PropTypes.array.isRequired
  },

  renderVideos(video) {
    return (
      <Video key={video.id} video={video} />
    );
  },

  render() {
    let nodes = this.props.videos.map(this.renderVideos);
    return (
      <div className="playlist-videos">
        {nodes}
      </div>
    );
  }
});
