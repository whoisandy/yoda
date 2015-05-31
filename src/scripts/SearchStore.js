'use strict';

import {Record, List, Map} from 'immutable';
import {Alt} from './Core';
import Actions from './Actions';

class SearchStore {
  constructor() {
    this.errMessage = null;
    this.results = List([]);

    this.bindListeners({
      handleFailSearchResults: Actions.failSearchResults,
      handleReceiveSearchResults: Actions.receiveSearchResults,
      handleFetchSearchResults: Actions.fetchSearchResults
    });
  }

  handleFetchSearchResults() {
    this.results = List([]);
  }

  handleFailSearchResults(err) {
    this.errMessage = err;
  }

  handleReceiveSearchResults(results){
    this.errMessage = null;
    results.forEach(result => {
      this.results = this.results.push(result);
    });
  }
}

export default Alt.createStore(SearchStore);
