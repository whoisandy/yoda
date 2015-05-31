'use strict';

import {Record, List, Map} from 'immutable';
import {Alt} from './Core';
import Actions from './Actions';

const Playlist = new Record({
  id: null,
  title: null,
  videos: []
});

class PlaylistStore {
  constructor() {
    this.errMessage = null;
    this.playlistVideos = List(Map({}));

    this.bindListeners({
      handleFailPlaylist: Actions.failPlaylist,
      handleReceivePlaylist: Actions.receivePlaylist,
      handleFetchPlaylist: Actions.fetchPlaylist
    });
  }

  handleFetchPlaylist() {
    this.playlistVideos = List(Map({}));
  }

  handleFailPlaylist(err) {
    this.errMessage = err;
  }

  handleReceivePlaylist(playlist){
    this.errMessage = null;
    this.playlistVideos = this.playlistVideos.push(new Playlist({
      id: playlist.id,
      title: playlist.title,
      videos: playlist.videos
    }));
  }
}

export default Alt.createStore(PlaylistStore);
