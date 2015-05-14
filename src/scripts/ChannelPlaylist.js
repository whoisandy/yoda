'use strict';

import React from 'react';
import ChannelPlaylistHeader from './ChannelPlaylistHeader';
import ChannelPlaylistVideos from './ChannelPlaylistVideos';

export default React.createClass({
  render() {
    var nodes = this.props.playlists.map(item => {
      return (
        <div key={item.id} className="playlist-item">
          <ChannelPlaylistHeader title={item.title} />
          <ChannelPlaylistVideos videos={item.videos} />
        </div>
      );
    });
    return (
      <div className="playlist-container">
        {nodes}
      </div>
    );
  }
});
