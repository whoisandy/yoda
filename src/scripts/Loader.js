'use strict';

import React from 'react';
import Join from 'react/lib/joinClasses';

export default React.createClass({
  getDefaultProps() {
    return {
      size: 32,
      stroke: 6,
      direction: 'col',
      message: 'Loading...'
    };
  },

  renderSpinner(props) {
    let spinClass = Join('spinner-container', props.direction);
    return (
      <div className={spinClass}>
        <svg className="spinner" width={props.size} height={props.size} viewBox="0 0 66 66">
          <circle className="path" fill="none" strokeWidth={props.stroke} strokeLinecap="square" cx="33" cy="33" r="30"></circle>
        </svg>
        {this.renderMessage(props.mesage)}
      </div>
    );
  },

  renderMessage(msg) {
    var msg = msg || this.props.message;
    return (<span className="spinner-message">{msg}</span>);
  },

  render() {
    var size = this.props.size + 'px';
    return (
      <div className="no-results">
        {this.renderSpinner(this.props)}
      </div>
    );
  }
});
