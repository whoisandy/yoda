'use strict';

import React from 'react';
import {Meta} from './Mixins';

export default React.createClass({
  mixins: [Meta],

  render() {
    return (
      <div className="playlist-header">
        <h3><a href="#">{this.props.title}</a></h3>
      </div>
    );
  }
});
