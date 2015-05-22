'use strict';

import React from 'react';
import PlaylistVideo from './PlaylistVideo';

export default React.createClass({
  propTypes: {
    videos: React.PropTypes.array.isRequired
  },

  render() {
    var videos = this.props.videos.map(item => {
      return <PlaylistVideo key={item.id} video={item} />;
    });

    return (
      <div className="playlist-videos">
        {videos}
      </div>
    );
  }
});
