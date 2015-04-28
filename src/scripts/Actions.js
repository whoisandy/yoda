'use strict';

import {Map} from 'immutable';
import {Alt, Api, Ydm} from './Core';

class Actions {
  receive(response) {
    this.dispatch(response);
  }

  fail(err) {
    this.dispatch(err);
  }

  fetchPlaylists(channel) {
    this.dispatch();
    Api.getChannelPlaylistsVideos(channel).then(data => {
      this.actions.receive(data);
    }).catch(err => {
      this.actions.fail(err);
    });
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
