'use strict';

import React from 'react/addons';
import Join from 'react/lib/joinClasses';
import {State} from 'react-router';
import Actions from './Actions';
import SearchStore from './SearchStore';
import {RenderMixin} from './Mixins';
import Search from './Search';
import Paginator from './Paginator';

const PureRenderMixin = React.addons.PureRenderMixin;

export default React.createClass({
  mixins: [PureRenderMixin, RenderMixin, State],

  getInitialState() {
    return SearchStore.getState();
  },

  componentDidMount() {
    var query = this.getParams().query;
    SearchStore.listen(this._search);
    Actions.fetchSearchResults(query);
  },

  componentWillUnmount() {
    SearchStore.unlisten(this._search);
  },

  handleLoadMore(results) {
    let query = this.getParams().query;
    let token = results[0].get('next');
    Actions.paginateSearchResultVideos(query, token);
  },

  _search() {
    this.setState(SearchStore.getState());
  },

  renderResults(query, results) {
    return (
      <div className="search">
        <Search more={this.handleLoadMore} results={results}/>
        <Paginator loading={this.props.more} handler={this.handleLoadMore.bind(null, results)} />
      </div>
    );
  },

  render() {
    var fragment;
    var page = Join('search-container');

    if(this.props.loading){
      fragment = this.renderLoader({message: 'Loading search results...'});
    } else {
      fragment = this.renderResults(this.getParams().query, this.state.results.toArray());
    }

    return this.renderFragment(page, fragment);
  }
});
