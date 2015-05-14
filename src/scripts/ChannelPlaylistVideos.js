'use strict';

import React from 'react';
import Video from './Video';

export default React.createClass({
  render() {
    var videos = this.props.videos.map(item => {
      return <ChannelPlaylistVideo key={item.snippet.resourceId.videoId} video={item} />;
    });

    return (
      <div className="playlist-videos">
        {videos}
      </div>
    );
  }
});
