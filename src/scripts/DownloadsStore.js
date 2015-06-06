'use strict';

import Immutable, {Record, Map, List} from 'immutable';
import {Alt} from './Core';
import Actions from './Actions';

const Download = new Record({
  id: null,
  title: null,
  path: null,
  total: 0,
  progress: 0,
  start: true,
  done: false
});

class DownloadsStore {
  constructor() {
    this.downloads = List(Map({}));

    this.on('serialize', () => {
      return this.downloads.toJS();
    });

    this.on('deserialize', (data) => {
      data.forEach(download => {
        let record = this.downloads.find(item => {
          return item.get('id') === download.id;
        });

        if(!record){
          this.downloads = this.downloads.push(Immutable.fromJS(download));
        }
      });

      return this.downloads;
    });

    this.bindListeners({
      handleDownload: Actions.download,
      handleProgress: Actions.progress,
      handleFinish: Actions.finish,
      handleClear: Actions.clear
    });
  }

  handleDownload(video) {
    this.downloads = this.downloads.push(new Download({
      id: video.id,
      title: video.title,
      path: video.path
    }));
  }

  handleProgress(video) {
    let idx = this.downloads.findIndex(item => {
      return item.get('id') === video.id;
    });

    this.downloads = this.downloads.update(idx, item => {
      return item.set('start', video.start)
              .set('total', video.total)
              .set('progress', video.progress);
    });
  }

  handleFinish(id){
    let idx = this.downloads.findIndex(item => {
      return item.get('id') === id;
    });

    this.downloads = this.downloads.update(idx, item => {
      return item.set('start', false).set('done', true);
    });
  }

  handleClear(data) {
    data.forEach(index => {
      let idx = this.downloads.findIndex(item => item.get('id') === index);
      this.downloads = this.downloads.delete(idx);
    });
  }
}

export default Alt.createStore(DownloadsStore, 'DownloadsStore');
