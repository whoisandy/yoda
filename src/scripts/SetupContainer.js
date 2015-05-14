'use strict';

import React from 'react';
import {Navigation, State} from 'react-router';

export default React.createClass({
  mixins: [Navigation, State],

  handleDetail(e){
    e.preventDefault();
    this.transitionTo('/channels/popular');
  },

  render() {
    return (
      <div className="setup">
        <h2>Setting up things here</h2>
        <a href="#" onClick={this.handleDetail}>Goto detail</a>
      </div>
    );
  }
});