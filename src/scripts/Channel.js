'use strict';

import React from 'react';
import PlaylistHeader from './PlaylistHeader';
import PlaylistVideos from './PlaylistVideos';

export default React.createClass({
  propTypes: {
    playlists: React.PropTypes.array.isRequired
  },

  render() {
    let nodes = this.props.playlists.map(item => {
      return (
        <div key={item.get('id')} className="channel-playlist-item">
          <PlaylistHeader title={item.get('title')} playlist={item.get('id')} />
          <PlaylistVideos videos={item.get('videos')} />
        </div>
      );
    });

    return (
      <div className="channel-playlist-container">
        {nodes}
      </div>
    );
  }
});
