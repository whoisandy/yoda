'use strict';

import React from 'react/addons';
import {RouteHandler} from 'react-router';
import AppStore from './AppStore';
import Titlebar from './Titlebar';
import Sidebar from './Sidebar';

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState() {
    return AppStore.getState();
  },

  componentDidMount() {
    this.context.router.transitionTo('/channels/popular');
    AppStore.listen(this.onDownload);
  },

  componentWillUnmount() {
    AppStore.unlisten(this.onDownload);
  },

  onDownload() {
    this.setState(AppStore.getState());
  },

  render() {
    var name = this.context.router.getCurrentPath();
    return (
      <div className="app">
        <Titlebar />
        <div className="content">
          <Sidebar status={this.state.status} />
          <div className="detail">
            <div className="detail-container">
              <div className="detail-content">
                <RouteHandler key={name} router={this.context.router} {...this.props} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});