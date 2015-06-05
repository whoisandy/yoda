'use strict';

import {Record, List, Map} from 'immutable';
import {Alt} from './Core';
import Actions from './Actions';

const Playlist = new Record({
  id: null,
  etag: null,
  title: null,
  videos: [],
  next: null
});

class PlaylistStore {
  constructor() {
    this.errMessage = null;
    this.playlistVideos = List(Map({}));

    this.bindListeners({
      handleFailPlaylist: Actions.failPlaylist,
      handleReceivePlaylist: Actions.receivePlaylist,
      handleUpdatePlaylist: Actions.updatePlaylist,
      handleFetchPlaylist: Actions.fetchPlaylist
    });
  }

  handleFetchPlaylist() {
    this.playlistVideos = List(Map({}));
  }

  handleFailPlaylist(err) {
    this.errMessage = err;
  }

  handleUpdatePlaylist(playlist) {
    let idx = this.playlistVideos.findIndex(item => {
      return item.get('id') === playlist.id;
    });

    this.playlistVideos = this.playlistVideos.update(idx, item => {
      let prevVideos = item.get('videos');
      let videos = prevVideos.concat(playlist.videos);
      return item.set('etag', playlist.etag)
              .set('next', playlist.next)
              .set('videos', videos);
    });
  }

  handleReceivePlaylist(playlist){
    this.errMessage = null;
    this.playlistVideos = this.playlistVideos.push(new Playlist({
      id: playlist.id,
      etag: playlist.etag,
      title: playlist.title,
      videos: playlist.videos,
      next: playlist.next
    }));
  }
}

export default Alt.createStore(PlaylistStore);
