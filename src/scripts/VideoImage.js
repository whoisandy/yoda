'use strict';

import React from 'react';
import {MetaMixin} from './Mixins';

export default React.createClass({
  mixins: [MetaMixin],

  render() {
    return (
        <div className="video-image">
          <img className="video-thumbnail image-thumbnail" src={this.props.image} alt={this.props.title} />
          <span className="video-duration">{this.handleDuration(this.props.duration)}</span>
        </div>
    );
  }
});