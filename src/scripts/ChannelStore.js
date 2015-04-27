'use strict';

import {List} from 'immutable';
import {Alt} from './Core';
import Actions from './Actions';

class ChannelStore {
  constructor() {
    this.errMessage = null;
    this.loading = true;
    this.playlists = List([]);

    this.bindListeners({
      handleFailPlaylists: Actions.fail,
      handleReceivePlaylists: Actions.receive,
      handleFetchPlaylists: Actions.fetchPlaylists
    });
  }

  handleFetchPlaylists() {
    this.loading = true;
    this.playlists = List([]);
  }

  handleFailPlaylists(err) {
    this.errMessage = err;
  }

  handleReceivePlaylists(playlists){
    this.errMessage = null;
    this.loading = false;
    this.playlists = this.playlists.push(playlists);
  }
}

export default Alt.createStore(ChannelStore);
