'use strict';

import React from 'react';

export default React.createClass({
  render() {
    return (
      <div className="downloads-header">
        <h2 className="downloads-title">{this.props.title}</h2>
        <div className="downloads-switch">
          <div className="btn-group">
            <button className="btn btn-xs btn-default" type="button">Active</button>
            <button className="btn btn-xs btn-default" type="button">Completed</button>
          </div>
        </div>
      </div>
    );
  }
});