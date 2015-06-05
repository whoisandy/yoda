'use strict';

import {Alt, Api, Ydm} from './Core';

class Actions {
  loading(store){
    this.dispatch(store);
  }

  fetchChannels() {
    this.dispatch();
    return Api.getChannels();
  }

  receiveChannelPlaylists(response) {
    this.dispatch(response);
    this.actions.loading('channel');
  }

  failChannelPlaylists(err) {
    this.dispatch(err);
    this.actions.loading('channel');
  }

  fetchChannelPlaylists(channel) {
    this.dispatch();
    this.actions.loading('channel');
    Api.getChannelPlaylistVideos(channel).then(data => {
      this.actions.receiveChannelPlaylists(data);
    }).catch(err => {
      this.actions.failChannelPlaylists(err);
    });
  }

  receivePlaylist(response) {
    this.dispatch(response);
    this.actions.loading('playlist');
  }

  updatePlaylist(response) {
    this.dispatch(response);
  }

  failPlaylist(err){
    this.dispatch(err);
    this.actions.loading('playlist');
  }

  fetchPlaylist(playlist) {
    this.dispatch();
    this.actions.loading('playlist');
    Api.getPlaylistVideos(playlist).then(data => {
      this.actions.receivePlaylist(data);
    }).catch(err => {
      this.actions.failPlaylist(err);
    });
  }

  paginatePlaylistVideos(playlist, next) {
    Api.paginatePlaylistVideos(playlist, next).then(data => {
      this.actions.updatePlaylist(data);
    }).catch(err => {
      this.actions.failPlaylist(err);
    });
  }

  receiveSearchResults(response){
    this.dispatch(response);
    this.actions.loading('search');
  }

  updateSearchResults(response) {
    this.dispatch(response);
  }

  failSearchResults(err){
    this.dispatch(err);
    this.actions.loading('search');
  }

  fetchSearchResults(query) {
    this.dispatch();
    this.actions.loading('search');
    Api.getSearchResultVideos(query).then(data => {
      this.actions.receiveSearchResults(data);
    }).catch(err => {
      this.actions.failSearchResults(err);
    });
  }

  paginateSearchResultVideos(query, next) {
    Api.paginateSearchResultVideos(query, next).then(data => {
      this.actions.updateSearchResults(data);
    }).catch(err => {
      this.actions.failSearchResults(err);
    });
  }

  prompt(item, filename) {
    Ydm.prompt(item, filename).then(data => {
      if(data){
        this.actions.download(item, filename);
      } else {
        this.actions.cancel(item.id);
      }
    });
  }

  cancel(id) {
    this.dispatch(id);
  }

  verify(id, filename) {
    return Ydm.verify(id, filename);
  }

  duplicate(item) {
    return Ydm.duplicate(item);
  }

  live(id) {
    Ydm.live(id);
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
      self.actions.snapshot();
      self.actions.progress(download);
    });
  }

  progress(video){
    let self = this;
    let dataSize = 0;
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
      setTimeout(() => {
        self.actions.finish(video.id);
      }, 600);
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

  clear() {
    this.dispatch();
    Ydm.clear('downloads');
  }

  show(filepath) {
    Ydm.show(filepath);
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
