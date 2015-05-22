'use strict';

import React from 'react/addons';
import Join from 'react/lib/joinClasses';
import {RouteHandler, State} from 'react-router';
import AppStore from './AppStore';
import Titlebar from './Titlebar';
import Sidebar from './Sidebar';

const PureRenderMixin = React.addons.PureRenderMixin;

export default React.createClass({
  mixins: [PureRenderMixin, State],

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
    var name = this.getPathname() === '/' ? 'setup' : '';
    var detailClass = Join('detail', name);

    return (
      <div className="app">
        <div className="content-container">
          <Titlebar />
          <div className="content">
            <Sidebar status={this.state.status} />
            <div className={detailClass}>
              <RouteHandler key={name} {...this.props} loading={this.state.loading} />
            </div>
          </div>
        </div>
      </div>
    );
  }
});