'use strict';

import React from 'react';
import Join from 'react/lib/joinClasses';
import {Link} from 'react-router';
import Constants from './Constants';

export default React.createClass({
  renderChannelTitle(title){
    return title.charAt(0).toUpperCase() + title.slice(1);
  },

  renderLink(channel){
    let href = '/channels/' + channel;
    let iconClass = 'icon-' + channel;
    return (
      <Link className='link list-group-item' key={href} to={href}>
        <span className={Join('icon', iconClass)}></span>
        <span className="title">{this.renderChannelTitle(channel)}</span>
      </Link>
    );
  },

  render() {
    let channels = Object.keys(Constants.api.channels);
    let links = channels.map(this.renderLink);
    return (
      <div className="sidebar-categories">
        <h4>Best of youtube</h4>
        <div className="sidebar-links list-group">
          {links}
        </div>
      </div>
    );
  }
});
