'use strict';

import React from 'react/addons';
import {RenderMixin, MetaMixin} from './Mixins';
import DownloadsStore from './DownloadsStore';
import DownloadsHeader from './DownloadsHeader';
import DownloadsItem from './DownloadsItem';

const PureRendererMixin = React.addons.PureRendererMixin;

export default React.createClass({
  mixins: [PureRendererMixin, RenderMixin, MetaMixin],

  getInitialState() {
    return DownloadsStore.getState();
  },

  componentDidMount() {
    DownloadsStore.listen(this.onProgress);
  },

  componentWillUnmount() {
    DownloadsStore.unlisten(this.onProgress);
  },

  onProgress() {
    this.setState(DownloadsStore.getState());
  },

  renderDownloadsHeader() {
    return (<DownloadsHeader title="Downloads" />);
  },

  renderNoDownloads() {
    return (
      <div className="downloads-content">
        {this.renderDownloadsHeader()}
        <div className="download-no-items">Currently no downloads</div>
      </div>
    );
  },

  renderDownloads(videos) {
    var downloads = videos.map(item => {
      return (<DownloadsItem key={Math.random()} item={item} />);
    });

    return (
      <div className="downloads-content">
        {this.renderDownloadsHeader()}
        <table className="download-items table table-condensed ">
          <thead>
            <tr>
              <th>#</th>
              <th>Video</th>
              <th>Size</th>
              <th>Status</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>{downloads}</tbody>
        </table>
      </div>
    );
  },

  render() {
    var fragment;
    var videos = this.state.downloads;

    if(videos.count()){
      fragment = this.renderDownloads(videos.toArray());
    } else {
      fragment = this.renderNoDownloads();
    }

    return this.renderFragment('downloads', fragment);
  }
});