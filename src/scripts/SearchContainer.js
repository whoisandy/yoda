'use strict';

import React from 'react/addons';
import Join from 'react/lib/joinClasses';
import {State} from 'react-router';
import Actions from './Actions';
import SearchStore from './SearchStore';
import {RenderMixin} from './Mixins';
import Search from './Search';

const PureRenderMixin = React.addons.PureRenderMixin;

export default React.createClass({
  mixins: [PureRenderMixin, RenderMixin, State],

  getInitialState() {
    return SearchStore.getState();
  },

  componentDidMount() {
    var query = this.getParams().query;
    SearchStore.listen(this.onSearch);
    this.fetchResults(query);
  },

  componentWillUpdate(nextProps) {
    if(this.props.params.query !== nextProps.params.query){
      this.fetchResults(nextProps.params.query);
    }
  },

  componentWillUnmount() {
    SearchStore.unlisten(this.onSearch);
  },

  onSearch() {
    this.setState(SearchStore.getState());
  },

  fetchResults(query) {
    Actions.fetchSearchResults(query);
  },

  renderResults(query, results) {
    return (
      <div className="search-results-container">
        <Search results={results} query={query}/>
      </div>
    );
  },

  render() {
    var fragment;
    var page = Join('search');

    if(this.props.loading){
      fragment = this.renderLoader({message: 'Loading search results...'});
    } else {
      fragment = this.renderResults(this.getParams().query, this.state.results.toArray());
    }

    return this.renderFragment(page, fragment);
  }
});
