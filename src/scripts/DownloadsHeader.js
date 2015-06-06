'use strict';

import React from 'react/addons';
import {Link} from 'react-router';
import Actions from './Actions';

const PureRenderMixin = React.addons.PureRenderMixin;

export default React.createClass({
  mixins: [PureRenderMixin],

  handleClear(e) {
    e.preventDefault();
    Actions.clear();
  },

  renderClear(group, count) {
    if(group === 'complete' && count > 0){
      return (
        <div className="downloads-clear">
          <a className="btn btn-sm btn-default" onClick={this.handleClear}>
            <span className="icon icon-clear"></span>Clear all
          </a>
        </div>
      );
    }
  },

  render() {
    return (
      <div className="downloads-header">
        <h2 className="downloads-title">{this.props.title}</h2>
        {this.renderClear(this.props.group, this.props.count)}
        <div className="downloads-switch">
          <div className="btn-group">
            <Link className="btn btn-sm btn-default" to="/downloads/active">
              <span className="icon icon-active"></span>Active
            </Link>
            <Link className="btn btn-sm btn-default" to="/downloads/complete">
              <span className="icon icon-done"></span>Complete
            </Link>
          </div>
        </div>
      </div>
    );
  }
});