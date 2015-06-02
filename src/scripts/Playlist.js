'use strict';

import React from 'react';
import PlaylistHeader from './PlaylistHeader';
import PlaylistVideos from './PlaylistVideos';

export default React.createClass({
  propTypes: {
    playlist: React.PropTypes.array.isRequired
  },

  render() {
    let nodes = this.props.playlist.map(playlist => {
      return (
        <div key={playlist.id} className="playlist-items">
          <PlaylistHeader title={playlist.get('title')} playlist={playlist.get('id')} />
          <PlaylistVideos videos={playlist.get('videos')} />
        </div>
      );
    });

    return (
      <div className="playlist">
        {nodes}
      </div>
    );
  }
});