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

    this.bindListeners({
      handleLoadingChannels: Actions.loadingChannels,
      handleLoadingPlaylist: Actions.loadingPlaylist,
      handleLoadingResults: Actions.loadingResults,
      handleStatus: Actions.status
    });
  }

  handleLoadingChannels() {
    this.waitFor(ChannelStore);
    let playlists = ChannelStore.getState().playlists;
    if(playlists.size > 0){
      this.loading = false;
    } else {
      this.loading = true;
    }
  }

  handleLoadingPlaylist() {
    this.waitFor(PlaylistStore);
    let videos = PlaylistStore.getState().playlistVideos;
    if(videos.size > 0){
      this.loading = false;
    } else {
      this.loading = true;
    }
  }

  handleLoadingResults() {
    this.waitFor(SearchStore);
    let results = SearchStore.getState().results;
    if(results.size > 0){
      this.loading = false;
    } else {
      this.loading = true;
    }
  }

  handleStatus() {
    this.waitFor(DownloadsStore);
    let downloads = DownloadsStore.getState().downloads;
    let isActive = downloads.toArray().every(item => {
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