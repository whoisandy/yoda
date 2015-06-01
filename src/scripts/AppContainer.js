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
    let name = this.getPathname();
    let contentClass = Join('content');
    if(name == '/'){
      contentClass = Join(contentClass, 'no-sidebar');
    }

    return (
      <div className="app">
        <div className="content-container">
          <Titlebar />
          <div className={contentClass}>
            <Sidebar status={this.state.status} count={this.state.count} />
            <RouteHandler key={name} loading={this.state.loading} />
          </div>
        </div>
      </div>
    );
  }
});