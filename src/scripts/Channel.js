'use strict';

import React from 'react';
import PlaylistHeader from './PlaylistHeader';
import PlaylistVideos from './PlaylistVideos';

export default React.createClass({
  propTypes: {
    playlists: React.PropTypes.array.isRequired
  },

  renderPlaylists(playlist) {
    return (
      <div key={playlist.get('id')} className="channel-playlist-item">
        <PlaylistHeader title={playlist.get('title')} playlist={playlist.get('id')} />
        <PlaylistVideos videos={playlist.get('videos')} />
      </div>
    );
  },

  render() {
    let nodes = this.props.playlists.map(this.renderPlaylists);
    return (
      <div className="channel-playlist-container">
        {nodes}
      </div>
    );
  }
});
