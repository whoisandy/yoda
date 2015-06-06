'use strict';

import React from 'react/addons';
import Join from 'react/lib/joinClasses';
import {State} from 'react-router';
import Actions from './Actions';
import PlaylistStore from './PlaylistStore';
import {RenderMixin} from './Mixins';
import Playlist from './Playlist';
import Paginator from './Paginator';

const PureRenderMixin = React.addons.PureRenderMixin;

export default React.createClass({
  mixins: [PureRenderMixin, RenderMixin, State],

  getInitialState() {
    return PlaylistStore.getState();
  },

  componentDidMount() {
    PlaylistStore.listen(this._change);
    Actions.fetchPlaylist(this.getParams().playlist);
  },

  componentWillUnmount() {
    PlaylistStore.unlisten(this._change);
  },

  handleLoadMore(playlist) {
    let id = playlist[0].get('id');
    let next = playlist !== undefined ? playlist[0].get('next') : '';
    Actions.paginatePlaylistVideos(id, next);
  },

  _change() {
    this.setState(PlaylistStore.getState());
  },

  renderPlaylist(playlist) {
    return (
      <div className="playlist">
        <Playlist playlist={playlist} />
        <Paginator loading={this.props.more} handler={this.handleLoadMore.bind(null, playlist)} />
      </div>
    );
  },

  render() {
    let fragment;
    let page = Join('playlist-container');
    if(this.props.loading){
      fragment = this.renderLoader({message: 'Loading playlist videos...'});
    } else {
      fragment = this.renderPlaylist(this.state.playlistVideos.toArray());
    }

    return this.renderFragment(page, fragment);
  }
});