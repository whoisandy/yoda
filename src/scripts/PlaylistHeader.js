'use strict';

import React from 'react';

export default React.createClass({
  handleShortenText(text, maxLength) {
    var ret = text;
    if (ret.length > maxLength) {
      ret = ret.substr(0, maxLength-3) + '...';
    }
    return ret;
  },

  render() {
    return (
      <div className="playlist-header">
        <h3>{this.props.title}</h3>
      </div>
    );
  }
});
