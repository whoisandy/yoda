'use strict';

import React from 'react/addons';
import {RouteHandler} from 'react-router';
import DetailHeader from './DetailHeader';

const PureRenderMixin = React.addons.PureRenderMixin;

export default React.createClass({
  mixins: [PureRenderMixin],

  componentWillUpdate(prevProps) {
    return ((this.props.status !== prevProps.status));
  },

  render() {
    var name = this.props.params.channel;
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