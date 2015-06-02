'use strict';

import React from 'react';
import {MetaMixin} from './Mixins';

export default React.createClass({
  mixins: [MetaMixin],

  render(duration){
    return (
      <span className="video-duration">{this.handleDuration(this.props.duration)}</span>
    );
  }
});
