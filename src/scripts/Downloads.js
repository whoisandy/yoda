'use strict';

import React from 'react/addons';
import Join from 'react/lib/joinClasses';
import {RenderMixin} from './Mixins';
import DownloadsHeader from './DownloadsHeader';
import DownloadsTable from './DownloadsTable';

const PureRenderMixin = React.addons.PureRenderMixin;

export default React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
    downloads: React.PropTypes.array.isRequired
  },

  mixins: [PureRenderMixin, RenderMixin],

  renderDownloadItems(group, downloads) {
    let count = downloads.length;
    return (
      <div className="downloads-content">
        <DownloadsHeader group={group} count={count} title={this.props.title} />
        <DownloadsTable group={group} downloads={downloads} />
      </div>
    );
  },

  render() {
    let page = Join('downloads', this.props.group);
    let fragment = this.renderDownloadItems(this.props.group, this.props.downloads);

    return this.renderFragment(page, fragment);
  }
})