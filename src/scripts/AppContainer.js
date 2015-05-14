'use strict';

import React from 'react/addons';
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
    AppStore.listen(this.onChange);
  },

  componentWillUnmount() {
    AppStore.unlisten(this.onChange);
  },

  onChange() {
    this.setState(AppStore.getState());
  },

  render() {
    var name = this.getParams().channel;
    return (
      <div className="app-content">
        <Titlebar />
        <div className="content">
          <Sidebar downloading={this.state.downloading}/>
          <div className="detail">
            <div className="detail-container">
              <div className="detail-content">
                <RouteHandler key={name} {...this.props} loading={this.state.loading}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});