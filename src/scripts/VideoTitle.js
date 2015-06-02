'use strict';

import React from 'react';

export default React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired
  },

  render (){
    return (
      <div className="video-title">
        <a href="#">{this.props.title}</a>
      </div>
    );
  }
});
