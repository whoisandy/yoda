'use strict';

import React from 'react';
import {RouteHandler, Navigation, State} from 'react-router';
import AppStore from './AppStore';
import Titlebar from './Titlebar';
import Sidebar from './Sidebar';

export default React.createClass({
  mixins: [Navigation, State],

  getInitialState() {
    return AppStore.getState();
  },

  componentDidMount() {
    this.transitionTo('/channels/popular');
    AppStore.listen(this.onDownload);
  },

  componentWillUnmount() {
    AppStore.unlisten(this.onDownload);
  },

  onDownload() {
    this.setState(AppStore.getState());
  },

  render() {
    var name = this.getParams().channel;
    return (
      <div className="app">
        <Titlebar />
        <div className="content">
          <Sidebar status={this.state.status} />
          <div className="detail">
            <div className="detail-container">
              <div className="detail-content">
                <RouteHandler key={name} {...this.props} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});