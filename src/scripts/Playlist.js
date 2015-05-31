'use strict';

import React from 'react';
import PlaylistHeader from './PlaylistHeader';
import PlaylistVideos from './PlaylistVideos';

export default React.createClass({
  propTypes: {
    playlist: React.PropTypes.array.isRequired
  },

  render() {
    return (
      <div className="playlist">
        {this.props.playlist.map(playlist => {
          return (
            <div key={playlist.id} className="playlist-items">
              <PlaylistHeader title={playlist.get('title')} playlist={playlist.get('id')} />
              <PlaylistVideos {...this.props} videos={playlist.get('videos')} />
            </div>
          );
        })}
      </div>
    );
  }
});