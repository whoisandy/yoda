'use strict';

import {Alt, Api, Ydm} from './Core';

class Actions {
  loading() {
    this.dispatch();
  }

  fetchChannels() {
    this.dispatch();
    return Api.getChannels();
  }

  receiveChannelPlaylists(response) {
    this.dispatch(response);
    this.actions.loading();
  }

  failChannelPlaylists(err) {
    this.dispatch(err);
    this.actions.loading();
  }

  fetchChannelPlaylists(channel) {
    this.dispatch();
    this.actions.loading();
    Api.getChannelPlaylistVideos(channel).then(data => {
      this.actions.receiveChannelPlaylists(data);
    }).catch(err => {
      this.actions.failChannelPlaylists(err);
    });
  }

  search(query) {
    console.log(query);
    this.dispatch();
  }

  download(video, filename) {
    let self = this;
    Ydm.download(video, filename).then(download => {
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
    this.actions.done();
  }

  finish(id) {
    this.dispatch(id);
    this.actions.status();
  }

  done() {
    this.dispatch();
  }
}

export default Alt.createActions(Actions);
