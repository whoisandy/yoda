'use strict';

import React from 'react';
import PlaylistHeader from './PlaylistHeader';
import PlaylistVideos from './PlaylistVideos';

export default React.createClass({
  render() {
    var nodes = this.props.playlists.map(item => {
      return (
        <div key={item.get('id')} className="playlist-item">
          <PlaylistHeader title={item.get('title')} />
          <PlaylistVideos videos={item.get('videos')} />
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
