'use strict';

import {Record, List, Map} from 'immutable';
import {Alt} from './Core';
import Actions from './Actions';

const Channel = new Record({
  id: null,
  title: null,
  videos: []
});

class ChannelStore {
  constructor() {
    this.errMessage = null;
    this.playlists = List(Map({}));

    this.bindListeners({
      handleFailChannelPlaylists: Actions.failChannelPlaylists,
      handleReceiveChannelPlaylists: Actions.receiveChannelPlaylists,
      handleFetchChannelPlaylists: Actions.fetchChannelPlaylists
    });
  }

  handleFetchChannelPlaylists() {
    this.playlists = List(Map({}));
  }

  handleFailChannelPlaylists(err) {
    this.errMessage = err;
  }

  handleReceiveChannelPlaylists(playlists){
    this.errMessage = null;
    playlists.forEach(playlist => {
      this.playlists = this.playlists.push(new Channel({
        id: playlist.id,
        title: playlist.title,
        videos: playlist.videos
      }));
    });
  }
}

export default Alt.createStore(ChannelStore);
