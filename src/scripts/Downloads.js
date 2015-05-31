'use strict';

import React from 'react/addons';
import Join from 'react/lib/joinClasses';
import {RenderMixin} from './Mixins';
import DownloadsHeader from './DownloadsHeader';
import DownloadsTable from './DownloadsTable';

export default React.createClass({
  propTypes: {
    downloads: React.PropTypes.array.isRequired
  },

  mixins: [RenderMixin],

  renderDownloadItems(group, downloads) {
    return (
      <div className="downloads-content">
        <DownloadsHeader title="Downloads" />
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