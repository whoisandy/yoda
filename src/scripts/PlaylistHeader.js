'use strict';

import React from 'react/addons';
import {Navigation} from 'react-router';

const PureRenderMixin = React.addons.PureRenderMixin;

export default React.createClass({
  mixins: [PureRenderMixin, Navigation],

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
