'use strict';

import React from 'react';
import Join from 'react/lib/joinClasses';
import {Link, State} from 'react-router'

export default React.createClass({
  propTypes: {
    status: React.PropTypes.bool
  },

  mixins: [State],

  componentWillUpdate(prevProps) {
      return this.props.status !== prevProps.status;
  },

  render() {
    let activeClass = Join('sidebar-download-btn list-group-item');
    let statusClass = Join('sidebar-download');
    let routeMatch = this.getPathname().split('/')[2];

    if(routeMatch === 'complete'){
      activeClass = Join(activeClass, 'active');
    }

    if(this.props.status){
      statusClass = Join(statusClass, 'downloading');
    }

    return (
      <div className={statusClass}>
        <div className="sidebar-download-btn-wrapper list-group">
          <Link className={activeClass} to="/downloads/active">
            <div className="sidebar-btn-title">
              <span className="icon icon-download"></span>Downloads
            </div>
            <span className="sidebar-btn-badge badge">1</span>
          </Link>
        </div>
      </div>
    );
  }
});