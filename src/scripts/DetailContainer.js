'use strict';

import React from 'react/addons';
import {RouteHandler, State} from 'react-router';
import DetailHeader from './DetailHeader';

export default React.createClass({
  mixins: [State],

  componentWillUpdate(prevProps) {
    return ((this.props.status !== prevProps.status));
  },

  render() {
    var name = this.getParams().channel;
    return (
      <div className="detail">
        <div className="detail-container">
          <DetailHeader />
          <div className="detail-content">
            <RouteHandler key={name} loading={this.props.loading} />
          </div>
        </div>
      </div>
    );
  }
});