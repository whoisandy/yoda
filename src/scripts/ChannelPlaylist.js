'use strict';

import React from 'react';
import ChannelPlaylistHeader from './ChannelPlaylistHeader';
import ChannelPlaylistVideos from './ChannelPlaylistVideos';

export default React.createClass({
  render() {
    var nodes = this.props.playlists.map(item => {
      return (
        <div key={item.get('id')} className="playlist-item">
          <ChannelPlaylistHeader title={item.get('title')} />
          <ChannelPlaylistVideos videos={item.get('videos')} />
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
