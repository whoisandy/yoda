'use strict';

import Core from './Core';

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
    return Core.Api.getChannels();
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
    Core.Api.getChannelPlaylistVideos(channel).then(data => {
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
    Core.Api.getPlaylistVideos(playlist).then(data => {
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
    Core.Api.getSearchResultsVideos(query).then(data => {
      this.actions.receiveSearchResults(data);
    }).catch(err => {
      this.actions.failSearchResults(err);
    });
  }

  download(video, filename) {
    let self = this;
    Core.Ydm.download(video, filename).then(download => {
      self.dispatch({
        id: download.id,
        title: download.title,
        total: download.total
      });
      self.actions.status();
      self.actions.progress(download);
    });
  }

  progress(video){
    let self = this;
    var dataSize = 0;
    video.stream.on('data', data => {
      dataSize = dataSize + data.length;
      let percent = parseInt(Math.ceil((dataSize / video.total) * 100));
      self.dispatch({
        id: video.id,
        progress: percent
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
    this.actions.done();
  }

  done() {
    let state;
    state = this.alt.takeSnapshot('DownloadsStore');
    Core.Ydm.save('downloads', state);
  }

  boot() {
    let state;
    this.dispatch();
    state = Core.Ydm.load('downloads');
    if(state !== null) this.alt.bootstrap(state);
  }
}

export default Core.Alt.createActions(Actions);
