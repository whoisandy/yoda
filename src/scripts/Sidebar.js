'use strict';

import React from 'react';
import {Link} from 'react-router';
import {MetaMixin} from './Mixins';

export default React.createClass({
  mixins: [MetaMixin],

  render() {
    var status = this.handleClassNames({
      'list-group-item': true,
      'downloading': this.props.status
    });

    return (
      <div className="sidebar">
        <div className="sidebar-categories">
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
        <div className="sidebar-buttons">
          <div className="settings-btn">
            <Link to="/preferences">
              <span className="icon icon-settings"></span>
            </Link>
          </div>
          <div className="download-btn">
            <Link className={status} to="/downloads">
              <span className="icon icon-download"></span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
});
