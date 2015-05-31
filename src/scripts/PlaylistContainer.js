'use strict';

import React from 'react/addons';
import Join from 'react/lib/joinClasses';
import {State} from 'react-router';
import Actions from './Actions';
import PlaylistStore from './PlaylistStore';
import {RenderMixin} from './Mixins';
import Playlist from './Playlist';

const PureRenderMixin = React.addons.PureRenderMixin;

export default React.createClass({
  mixins: [PureRenderMixin, RenderMixin, State],

  getInitialState() {
    return PlaylistStore.getState();
  },

  componentDidMount() {
    PlaylistStore.listen(this.onChange);
    Actions.fetchPlaylist(this.getParams().playlist);
  },

  componentWillUnmount() {
    PlaylistStore.unlisten(this.onChange);
  },

  onChange() {
    this.setState(PlaylistStore.getState());
  },

  renderPlaylist(playlist) {
    return (
      <div className="playlist-container">
        <Playlist playlist={playlist} />
      </div>
    );
  },

  render() {
    let fragment;
    let page = Join('playlist');

    if(this.props.loading){
      fragment = this.renderLoader({message: 'Loading playlist videos...'});
    } else {
      fragment = this.renderPlaylist(this.state.playlistVideos.toArray());
    }

    return this.renderFragment(page, fragment);
  }
});