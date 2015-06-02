'use strict';

import React from 'react/addons';
import {RenderMixin} from './Mixins';
import DownloadsTableRow from './DownloadsTableRow';

const PureRenderMixin = React.addons.PureRenderMixin;

export default React.createClass({
  propTypes: {
    group: React.PropTypes.string.isRequired,
    downloads: React.PropTypes.array.isRequired
  },

  mixins: [PureRenderMixin, RenderMixin],

  renderNoDownloads(group) {
    let fragment;
    if(group === 'active'){
      fragment = (
        <p>Currently no active downloads</p>
      );
    } else {
      fragment = (
        <p>No downloads to show</p>
      );
    }
    return (
      <div className="no-results">
        {fragment}
      </div>
    );
  },

  renderDownloadsTable(group, downloads) {
    let nodes = downloads.map(download => {
      return <DownloadsTableRow key={download.get('id')} download={download} />
    });

    return (
      <table className="download-items-table table table-bordered table-striped">
        <thead>
          <tr>
            <th className="download-hash">#</th>
            <th className="download-title">Video</th>
            <th className="download-size">Size</th>
            <th className="download-status">Status</th>
            <th className="download-progress">Progress</th>
          </tr>
        </thead>
        <tbody>
          {nodes}
        </tbody>
      </table>
    );
  },

  render() {
    let fragment;
    let page = 'download-items';

    if(!this.props.downloads.length){
      fragment = this.renderNoDownloads(this.props.group);
    } else {
      fragment = this.renderDownloadsTable(this.props.group, this.props.downloads);
    }

    return this.renderFragment(page, fragment);
  }
});