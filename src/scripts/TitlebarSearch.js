'use strict';

import React from 'react';
import Join from 'react/lib/joinClasses';
import {Navigation, State} from 'react-router';
import Actions from './Actions';

export default React.createClass({
  mixins: [Navigation, State],

  getInitialState() {
    return {
      query: '',
      hasQuery: false
    };
  },

  handleChange(e) {
    e.preventDefault();
    var searchInput = React.findDOMNode(this.refs.searchInput);
    var query = searchInput.value.trim();
    if(query.length > 0){
      this.setState({
        hasQuery: true
      });
    } else {
      this.setState({
        hasQuery: false
      });
    }
    searchInput.focus();
  },

  handleSubmit(e) {
    e.preventDefault();
    var query = React.findDOMNode(this.refs.searchInput).value.trim();
    if(query){
      this.setState({
        hasQuery: true
      });
    }
    this.transitionTo('search', {query: query});
  },

  handleCancel(e) {
    e.preventDefault();
    var searchInput = React.findDOMNode(this.refs.searchInput);
    searchInput.value = '';
    this.handleChange(e);
  },

  render() {
    var cancelClass = Join('icon', 'icon-cancel');
    if(this.state.hasQuery){
      cancelClass = Join(cancelClass, 'icon-show');
    }
    return (
      <div className="searchbar">
        <form className="searchform" onSubmit={this.handleSubmit}>
          <span className="icon icon-search"></span>
          <input type="search" ref="searchInput" className="form-control" placeholder="Search youtube videos here" autoComplete="on" onChange={this.handleChange}/>
          <span className={cancelClass} onClick={this.handleCancel}></span>
        </form>
      </div>
    );
  }
});