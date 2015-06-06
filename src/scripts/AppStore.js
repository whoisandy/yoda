'use strict';

import {Alt} from './Core';
import Actions from './Actions';
import ChannelStore from './ChannelStore';
import PlaylistStore from './PlaylistStore';
import SearchStore from './SearchStore';
import DownloadsStore from './DownloadsStore';

const Stores = {
  channel: {
    name: ChannelStore,
    data: 'playlists'
  },

  playlist: {
    name: PlaylistStore,
    data: 'playlistVideos'
  },

  search: {
    name: SearchStore,
    data: 'results'
  }
};

class AppStore {
  constructor() {
    this.loading = true;
    this.status = false;
    this.more = false;
    this.count = 0;

    this.bindListeners({
      handleLoading: Actions.loading,
      handleStatus: Actions.status,
      handleMore: Actions.more
    });
  }

  handleLoading(store) {
    this.waitFor(Stores[store].name.dispatchToken);
    let data = Stores[store].name.getState()[Stores[store].data];
    if(data.count() > 0){
      this.loading = false;
    } else {
      this.loading = true;
    }
  }

  handleStatus() {
    this.waitFor(DownloadsStore);
    let {downloads} = DownloadsStore.getState();
    let active = downloads.filter(item => {
      return item.get('done') === false;
    });
    if(active.count()){
      this.count = active.count();
      this.status = true;
    } else {
      this.count = 0;
      this.status = false;
    }
  }

  handleMore(store) {
    this.more = !this.more;
  }
}

export default Alt.createStore(AppStore);