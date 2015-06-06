'use strict';

import React from 'react';
import {RenderMixin} from './Mixins';

export default React.createClass({
  propTypes: {
    text: React.PropTypes.string,
    handler: React.PropTypes.func.isRequired
  },

  mixins: [RenderMixin],

  getDefaultProps() {
    return {
      text: 'Load more',
      handler: this._noop
    }
  },

  _noop() {},

  renderPaginator() {
    if(this.props.loading){
      return this.renderLoader({size: 18, direction: 'row', message: ''});
    }
    return (
      <a className="btn btn-sm btn-default" onClick={this.props.handler}>{this.props.text}</a>
    );
  },

  render() {
    return (
      <div className="paginator">
        {this.renderPaginator()}
      </div>
    );
  }
});