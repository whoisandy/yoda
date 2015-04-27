'use strict';

import React from 'react';
import PlaylistHeader from './PlaylistHeader';
import PlaylistVideos from './PlaylistVideos';

export default React.createClass({
  render() {
    console.log(this.props.playlists);
    var nodes = this.props.playlists.map(item => {
      return (
        <div key={item.id} className="playlist-item">
          <PlaylistHeader title={item.title} />
          <PlaylistVideos videos={item.videos} />
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
