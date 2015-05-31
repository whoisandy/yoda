'use strict';

import React from 'react';
import {Navigation} from 'react-router';

export default React.createClass({
  mixins: [Navigation],

  propTypes: {
    title: React.PropTypes.string.isRequired,
    playlist: React.PropTypes.string.isRequired
  },

  handleClick(e) {
    e.preventDefault();
    this.transitionTo('playlist', {playlist: this.props.playlist});
  },

  render() {
    return (
      <div className="playlist-header">
        <h3 onClick={this.handleClick}>{this.props.title}</h3>
      </div>
    );
  }
});
