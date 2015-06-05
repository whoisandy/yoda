'use strict';

import React from 'react';

export default React.createClass({
  getDefaultProps() {
    return {
      height: 10,
      color: '#0bD318'
    }
  },

  render() {
    var completed = this.props.completed;

    if (completed < 0) {
      completed = 0;
    }
    if (completed > 100) {
      completed = 100;
    }

    var style = {
      height: this.props.height,
      backgroundColor: this.props.color,
      width: completed + '%',
      transition: 'width 200ms ease'
    };

    return (
      <div className="progressbar-container">
        <div className="progressbar-value">{this.props.completed + '%'}</div>
        <div className="progressbar-progress" style={style}></div>
      </div>
    );
  }
});
