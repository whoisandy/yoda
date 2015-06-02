'use strict';

import React from 'react';
import {MetaMixin} from './Mixins';

export default React.createClass({
  mixins: [MetaMixin],

  propTypes: {
    channel: React.PropTypes.string.isRequired,
    views: React.PropTypes.string.isRequired,
    published: React.PropTypes.string.isRequired
  },

  render() {
    return (
      <div className="video-meta">
        <span>{'by ' + this.props.channel}</span>
        <ul>
          <li>{this.handleViewCount(this.props.views)}</li>
          <li>{this.handlePublishedAt(this.props.published)}</li>
        </ul>
      </div>
    );
  }
});
