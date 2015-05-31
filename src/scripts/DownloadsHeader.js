'use strict';

import React from 'react';
import {Link} from 'react-router';

export default React.createClass({
  render() {
    return (
      <div className="downloads-header">
        <h2 className="downloads-title">{this.props.title}</h2>
        <div className="downloads-switch">
          <div className="btn-group">
            <Link className="btn btn-sm btn-default" to="/downloads/active">
              <span className="icon icon-active"></span>Active
            </Link>
            <Link className="btn btn-sm btn-default" to="/downloads/complete">
              <span className="icon icon-done"></span>Complete
            </Link>
          </div>
        </div>
      </div>
    );
  }
});