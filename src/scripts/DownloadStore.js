'use strict';

import {Record, Map, List} from 'immutable';
import {Alt} from './Core';
import Actions from './Actions';

const Download = new Record({
  id: null,
  title: null,
  total: null,
  progress: 0,
  done: false
});

class DownloadsStore {
  constructor() {
    this.status = false;
    this.downloads = List(Map({}));

    this.bindListeners({
      handleDownload: Actions.download,
      handleProgress: Actions.progress,
      handleFinish: Actions.finish
    });
  }

  handleDownload(video) {
    this.downloads = this.downloads.push(new Download({
      id: video.id,
      title: video.title,
      total: video.total,
      progress: 0,
      done: false
    }));
  }

  handleProgress(video) {
    var idx = this.downloads.findIndex(item => {
      return item.get('id') === video.id;
    });

    this.downloads = this.downloads.update(idx, item => {
      return item.set('progress', video.progress);
    });
  }

  handleFinish(id){
    var idx = this.downloads.findIndex(item => {
      return item.get('id') === id;
    });

    this.downloads = this.downloads.update(idx, item => {
      return item.set('done', true);
    });
  }
}

export default Alt.createStore(DownloadsStore);
