'use strict';

import React from 'react';
import PlaylistHeader from './PlaylistHeader';
import PlaylistVideos from './PlaylistVideos';

const PureRenderMixin = React.addons.PureRenderMixin;

export default React.createClass({
  propTypes: {
    playlist: React.PropTypes.array.isRequired,
  },

  mixins: [PureRenderMixin],

  renderPlaylists(playlist){
    return (
      <div key={playlist.get('id')} className="playlist-items">
        <PlaylistHeader title={playlist.get('title')} playlist={playlist.get('id')} />
        <PlaylistVideos videos={playlist.get('videos')} />
      </div>
    );
  },

  render() {
    let nodes = this.props.playlist.map(this.renderPlaylists);
    return (
      <div className="playlist-items-container">
        {nodes}
      </div>
    );
  }
});