'use strict';

import React from 'react';
import {RouteHandler, State} from 'react-router';
import AppStore from './AppStore';
import Titlebar from './Titlebar';
import Sidebar from './Sidebar';

export default React.createClass({
  mixins: [State],

  getInitialState() {
    return AppStore.getState();
  },

  componentDidMount() {
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
                <RouteHandler key={name} {...this.props} loading={this.state.loading} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});