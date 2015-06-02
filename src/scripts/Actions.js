'use strict';

import {Alt, Api, Ydm} from './Core';

class Actions {
  loadingChannels() {
    this.dispatch();
  }

  loadingPlaylist() {
    this.dispatch();
  }

  loadingResults() {
    this.dispatch();
  }

  fetchChannels() {
    this.dispatch();
    return Api.getChannels();
  }

  receiveChannelPlaylists(response) {
    this.dispatch(response);
    this.actions.loadingChannels();
  }

  failChannelPlaylists(err) {
    this.dispatch(err);
    this.actions.loadingChannels();
  }

  fetchChannelPlaylists(channel) {
    this.dispatch();
    this.actions.loadingChannels();
    Api.getChannelPlaylistVideos(channel).then(data => {
      this.actions.receiveChannelPlaylists(data);
    }).catch(err => {
      this.actions.failChannelPlaylists(err);
    });
  }

  receiveSearchResults(response){
    this.dispatch(response);
    this.actions.loadingResults();
  }

  failSearchResults(err){
    this.dispatch(err);
    this.actions.loadingResults();
  }

  fetchPlaylist(playlist) {
    this.dispatch();
    this.actions.loadingPlaylist();
    Api.getPlaylistVideos(playlist).then(data => {
      this.actions.receivePlaylist(data);
    }).catch(err => {
      this.actions.failPlaylist(err);
    });
  }

  receivePlaylist(response) {
    this.dispatch(response);
    this.actions.loadingPlaylist();
  }

  failPlaylist(err){
    this.dispatch(err);
    this.actions.loadingPlaylist();
  }

  fetchSearchResults(query) {
    this.dispatch();
    this.actions.loadingResults();
    Api.getSearchResultVideos(query).then(data => {
      this.actions.receiveSearchResults(data);
    }).catch(err => {
      this.actions.failSearchResults(err);
    });
  }

  download(video, filename) {
    let self = this;
    Ydm.download(video, filename).then(download => {
      self.dispatch({
        id: download.id,
        title: download.title,
        path: download.path
      });
      self.actions.status();
      self.actions.progress(download);
    });
  }

  progress(video){
    let self = this;
    var dataSize = 0;
    video.stream.on('info', (info, format) => {
      let total = format.size;
      video.stream.on('data', data => {
        dataSize = dataSize + data.length;
        let percent = parseInt(Math.ceil((dataSize / total) * 100));
        self.dispatch({
          id: video.id,
          total: total,
          progress: percent,
          start: false
        });
      });
    });

    video.stream.on('end', () => {
      self.actions.finish(video.id);
    });
  }

  status() {
    this.dispatch();
  }

  finish(id) {
    this.dispatch(id);
    this.actions.status();
    this.actions.snapshot();
    this.actions.notify();
  }

  notify() {
    Ydm.notify();
  }

  snapshot() {
    this.dispatch();
    let state = this.alt.takeSnapshot('DownloadsStore');
    Ydm.save('downloads', state);
  }

  boot() {
    this.dispatch();
    let state = Ydm.load('downloads');
    if(state !== null) {
      this.alt.bootstrap(state);
    }
  }
}

export default Alt.createActions(Actions);
