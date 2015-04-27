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
        <h3>{this.handleShortenText(this.props.title, 26)}</h3>
      </div>
    );
  }
});
