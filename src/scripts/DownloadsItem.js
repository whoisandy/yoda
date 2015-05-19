'use strict';

import React from 'react';
import {RenderMixin, MetaMixin} from './Mixins';

export default React.createClass({
  mixins: [RenderMixin, MetaMixin],

  renderHash(done){
    if(!done){
      return (<span className="active icon icon-active"></span>);
    } else {
      return (<span className="done icon icon-done"></span>);
    }
  },

  render() {
    return (
      <tr className="item">
        <td className="hash">{this.renderHash(this.props.item.get('done'))}</td>
        <td className="title">
          <span>{this.handleShortenText(this.props.item.get('title'), 36)}</span>
        </td>
        <td className="size">
          <span>{this.handleSize(this.props.item.get('total'))}</span>
        </td>
        <td className="status">
          <span>{this.props.item.get('done') ? 'Done' : 'Downloading'}</span>
        </td>
        <td className="percent">
          {this.renderProgress({height: 14, completed: this.props.item.get('progress')})}
        </td>
      </tr>
    );
  }
});