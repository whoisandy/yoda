'use strict';

import {Alt} from './Core';
import Actions from './Actions';
import ChannelStore from './ChannelStore';
import DownloadsStore from './DownloadsStore';

class AppStore {
  constructor() {
    this.loading = true;
    this.status = false;

    this.bindListeners({
      handleLoading: Actions.loading,
      handleStatus: Actions.status
    });
  }

  handleLoading() {
    this.waitFor(ChannelStore);
    var playlists = ChannelStore.getState().playlists;
    if(playlists.size > 0){
      this.loading = false;
    } else {
      this.loading = true;
    }
  }

  handleStatus() {
    this.waitFor(DownloadsStore);
    var downloads = DownloadsStore.getState().downloads;
    var isActive = downloads.toArray().every(item => {
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