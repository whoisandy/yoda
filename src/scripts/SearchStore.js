'use strict';

import {Record, List, Map} from 'immutable';
import {Alt} from './Core';
import Actions from './Actions';

const Search = new Record({
  etag: null,
  query: null,
  videos: [],
  next: null
});

class SearchStore {
  constructor() {
    this.errMessage = null;
    this.results = List(Map({}));

    this.bindListeners({
      handleFailSearchResults: Actions.failSearchResults,
      handleReceiveSearchResults: Actions.receiveSearchResults,
      handleUpdateSearchResults: Actions.updateSearchResults,
      handleFetchSearchResults: Actions.fetchSearchResults
    });
  }

  handleFetchSearchResults() {
    this.results = List([]);
  }

  handleFailSearchResults(err) {
    this.errMessage = err;
  }

  handleUpdateSearchResults(result) {
    let idx = this.results.findIndex(item => {
      return item.get('query') === result.query;
    });

    this.results = this.results.update(idx, item => {
      let prevVideos = item.get('videos');
      let videos = prevVideos.concat(result.videos);
      return item.set('etag', result.etag)
              .set('next', result.next)
              .set('videos', videos);
    });
  }

  handleReceiveSearchResults(result){
    this.errMessage = null;
    this.results = this.results.push(new Search({
      etag: result.etag,
      query: result.query,
      videos: result.videos,
      next: result.next || null
    }));
  }
}

export default Alt.createStore(SearchStore);
