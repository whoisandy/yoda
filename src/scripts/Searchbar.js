'use strict';

import React from 'react';
import {Navigation, State} from 'react-router';
import Actions from './Actions';

export default React.createClass({
  mixins: [Navigation, State],

  getInitialState() {
    return {
      hasQuery: false
    };
  },

  handleSubmit(e) {
    e.preventDefault();
    var query = React.findDOMNode(this.refs.searchInput).value.trim();
    if(query){
      this.setState({
        hasQuery: true
      });
    }
    Actions.search(query);
  },

  render() {
    return (
      <div className="searchbar">
        <form className="searchform" onSubmit={this.handleSubmit}>
          <span className="icon icon-search"></span>
          <input type="search" ref="searchInput" className="form-control" placeholder="Search youtube videos here" autoComplete="on" />
        </form>
      </div>
    );
  }
});