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
    this.complete = List(Map({}));

    this.on('serialize', () => {
      return {
        complete: this.complete.toJS()
      };
    });

    this.on('deserialize', (data) => {
      data.complete.forEach(complete => {
        let record = this.complete.find(item => {
          return item.get('id') === complete.id;
        });

        if(!record){
          this.complete = this.complete.push(Immutable.fromJS(complete));
        }
      });

      return this.complete;
    });

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

    let item = this.downloads.find(item => {
      return item.get('id') == id;
    });

    this.complete = this.complete.push(item);
    this.downloads = this.downloads.delete(idx);
  }
}

export default Alt.createStore(DownloadsStore, 'DownloadsStore');
