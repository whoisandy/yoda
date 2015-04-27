'use strict';

import React from 'react';

export default React.createClass({
  getDefaultProps() {
    return {
      size: 32,
      stroke: 6,
      status: true
    };
  },

  renderText() {
    return (
      <div className="status">
        <p>Loading...</p>
      </div>
    );
  },

  render() {
    var size = this.props.size + 'px';
    return (
      <div className="no-results">
        <svg className="spinner" width={size} height={size} viewBox="0 0 66 66">
          <circle className="path" fill="none" strokeWidth={this.props.stroke} strokeLinecap="square" cx="33" cy="33" r="30"></circle>
        </svg>
        {this.props.status ? this.renderText() : null}
      </div>
    );
  }
});
