'use strict';

import React from 'react/addons';
import {RouteHandler, State} from 'react-router';

export default React.createClass({
  mixins: [State],

  componentWillUpdate(prevProps) {
    return this.props.loading !== prevProps.loading;
  },

  render() {
    var name = this.getParams().channel;
    return (
      <div className="detail-container">
        <div className="detail-content">
          <RouteHandler key={name} {...this.props} loading={this.props.loading} />
        </div>
      </div>
    );
  }
});