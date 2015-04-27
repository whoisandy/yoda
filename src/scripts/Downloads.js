'use strict';

import React from 'react/addons';
import DownloadsStore from './DownloadsStore';
import DownloadsItem from './DownloadsItem';

const PureRendererMixin = React.addons.PureRendererMixin;

export default React.createClass({
  mixins: [PureRendererMixin],

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

  renderNoDownloads() {
    return (
      <p>Currently no downloads</p>
    );
  },

  renderDownloads(videos) {
    var downloads = videos.map(item => {
      return (<DownloadsItem key={Math.random()} item={item} />);
    });

    return (
      <table className="table table-condensed download-items">
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

    return (
      <div className="downloads">
        <h2>Downloads</h2>
        {fragment}
      </div>
    );
  }
});