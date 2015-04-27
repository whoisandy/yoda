'use strict';

import {Alt} from './Core';
import Actions from './Actions';
import DownloadsStore from './DownloadsStore';

class AppStore {
  constructor() {
    this.status = false;

    this.bindListeners({
      handleStatus: Actions.status
    });
  }

  handleStatus() {
    this.waitFor(DownloadsStore);
    var downloads = DownloadsStore.getState().downloads.toArray();
    var isActive = downloads.every(item => {
      return item.get('done') === true;
    });
    if(!isActive){
      this.status = true;
    } else {
      this.status = false;
    }
  }
}

export default Alt.createStore(AppStore);
