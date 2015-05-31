'use strict';

import React from 'react/addons';
import {RenderMixin} from './Mixins';
import DownloadsTableRow from './DownloadsTableRow';

export default React.createClass({
  propTypes: {
    group: React.PropTypes.string.isRequired,
    downloads: React.PropTypes.array.isRequired
  },

  mixins: [RenderMixin],

  renderNoDownloads(group) {
    if(group === 'active'){
      return (
        <div className="no-results">
          <p>Currently no active downloads</p>
        </div>
      );
    } else {
      return (
        <div className="no-results">
          <p>No downloads to show</p>
        </div>
      );
    }
  },

  renderDownloadsTable(group, downloads) {
    let nodes = downloads.map(download => {
      return <DownloadsTableRow key={download.get('id')} download={download} />
    });

    return (
      <table className="download-items-table table table-bordered table-striped">
        <thead>
          <tr>
            <th className="hash">#</th>
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