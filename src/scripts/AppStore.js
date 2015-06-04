'use strict';

import {Alt} from './Core';
import Actions from './Actions';
import ChannelStore from './ChannelStore';
import PlaylistStore from './PlaylistStore';
import SearchStore from './SearchStore';
import DownloadsStore from './DownloadsStore';

class AppStore {
  constructor() {
    this.loading = true;
    this.status = false;
    this.count = 0;

    this.bindListeners({
      handleLoadingChannels: Actions.loadingChannels,
      handleLoadingPlaylist: Actions.loadingPlaylist,
      handleLoadingResults: Actions.loadingResults,
      handleStatus: Actions.status
    });
  }

  handleLoadingChannels() {
    this.waitFor(ChannelStore);
    let {playlists} = ChannelStore.getState();
    if(playlists.size > 0){
      this.loading = false;
    } else {
      this.loading = true;
    }
  }

  handleLoadingPlaylist() {
    this.waitFor(PlaylistStore);
    let {playlistVideos} = PlaylistStore.getState();
    if(playlistVideos.size > 0){
      this.loading = false;
    } else {
      this.loading = true;
    }
  }

  handleLoadingResults() {
    this.waitFor(SearchStore);
    let {results} = SearchStore.getState();
    if(results.size > 0){
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
}

export default Alt.createStore(AppStore);