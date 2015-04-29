'use strict';

import React from 'react';
import Progress from './Progress';

export default React.createClass({
  handleShortenText(text, maxLength) {
    var ret = text;
    if (ret.length > maxLength) {
      ret = ret.substr(0, maxLength-3) + '...';
    }
    return ret;
  },

  handleSize(bytes){
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return 'n/a';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    if (i == 0) return bytes + ' ' + sizes[i];
    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
  },

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
          <Progress height={14} completed={this.props.item.get('progress')} />
        </td>
      </tr>
    );
  }
});