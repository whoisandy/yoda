'use strict';

import React from 'react';
import SidebarCategories from './SidebarCategories';
import SidebarDownload from './SidebarDownload';

export default React.createClass({
  componentWillUpdate(prevProps) {
    return this.props.status !== prevProps.status;
  },

  render() {
    return (
      <div className="sidebar">
        <SidebarCategories />
        <SidebarDownload status={this.props.status} count={this.props.count} />
      </div>
    );
  }
});
