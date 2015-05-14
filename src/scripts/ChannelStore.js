'use strict';

import {Record, List, Map} from 'immutable';
import {Alt} from './Core';
import Actions from './Actions';

const Playlist = new Record({
  id: null,
  title: null,
  videos: []
});

class ChannelStore {
  constructor() {
    this.errMessage = null;
    this.playlists = List(Map({}));

    this.bindListeners({
      handleFailPlaylists: Actions.fail,
      handleReceivePlaylists: Actions.receive,
      handleFetchPlaylists: Actions.fetchPlaylists
    });
  }

  handleFetchPlaylists() {
    this.playlists = List([]);
  }

  handleFailPlaylists(err) {
    this.errMessage = err;
  }

  handleReceivePlaylists(playlists){
    this.errMessage = null;
    playlists.forEach(playlist =>{
      this.playlists = this.playlists.push(new Playlist({
        id: playlist.id,
        title: playlist.title,
        videos: playlist.videos
      }));
    })
  }
}

export default Alt.createStore(ChannelStore);
