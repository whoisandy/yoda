'use strict';

import React from 'react';

export default React.createClass({
  propTypes: {
    text: React.PropTypes.string,
    handler: React.PropTypes.func.isRequired
  },

  getDefaultProps() {
    return {
      text: 'Load more',
      handler: this._noop
    }
  },

  _noop() {},

  render() {
    return (
      <div className="paginator">
        <a className="btn btn-default" onClick={this.props.handler}>{this.props.text}</a>
      </div>
    );
  }
});