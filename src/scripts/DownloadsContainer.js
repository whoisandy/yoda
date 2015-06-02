'use strict';

import React from 'react/addons';
import Join from 'react/lib/joinClasses';
import {RouteHandler} from 'react-router';
import Actions from './Actions';
import DownloadsStore from './DownloadsStore';
import {RenderMixin} from './Mixins';
import Downloads from './Downloads';

const PureRenderMixin = React.addons.PureRenderMixin;

export default React.createClass({
  mixins: [PureRenderMixin, RenderMixin],

  getInitialState() {
    return DownloadsStore.getState();
  },

  componentDidMount() {
    DownloadsStore.listen(this.onProgress);
    Actions.boot();
  },

  componentWillUnmount() {
    DownloadsStore.unlisten(this.onProgress);
  },

  onProgress() {
    this.setState(DownloadsStore.getState());
  },

  renderDownloads(group, downloads) {
    return (<Downloads title="Downloads" group={group} downloads={downloads} />);
  },

  render() {
    let fragment;
    let page = Join('downloads-container');
    let group = this.props.params.group;
    if(group === 'active'){
      fragment = this.renderDownloads(group, this.state.downloads.toArray());
    } else {
      fragment = this.renderDownloads(group, this.state.complete.toArray());
    }

    return this.renderFragment(page, fragment);
  }
});