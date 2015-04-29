'use strict';

import React from 'react';
import {Link} from 'react-router';

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.func.isRequired
  },

  render() {
    return (
      <div className="sidebar">
        <div className="categories">
          <h4>Best of youtube</h4>
          <div className="list-group">
            <Link className="list-group-item" to="/channels/popular">
              <span className="icon icon-popular"></span>Popular on Youtube
            </Link>
            <Link className="list-group-item" to="/channels/music">
              <span className="icon icon-music"></span>Music
            </Link>
            <Link className="list-group-item" to="/channels/sports">
              <span className="icon icon-sports"></span>Sports
            </Link>
            <Link className="list-group-item" to="/channels/gaming">
              <span className="icon icon-game"></span>Gaming
            </Link>
            <Link className="list-group-item" to="/channels/education">
              <span className="icon icon-education"></span>Education
            </Link>
            <Link className="list-group-item" to="/channels/news">
              <span className="icon icon-news"></span>News
            </Link>
          </div>
        </div>
        <div className="settings-download">
          <div className="settings-btn">
            <Link to="/preferences">
              <span className="icon icon-settings"></span>
            </Link>
          </div>
          <div className="download-btn">
            <Link className={this.props.status ? 'list-group-item downloading' : 'list-group-item'} to="/downloads">
              <span className="icon icon-download"></span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
});
