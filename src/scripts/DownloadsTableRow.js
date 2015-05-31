'use strict';

import Remote from 'remote';
import React from 'react';
import {RenderMixin, MetaMixin} from './Mixins';

const Shell = Remote.require('shell');

export default React.createClass({
  propTypes: {
    download: React.PropTypes.object.isRequired
  },

  mixins: [RenderMixin, MetaMixin],

  componentWillUpdate(nextProps) {
    return (this.props.download.get('progress') !== nextProps.download.get('progress'));
  },

  handleOpenInFinder(e){
    e.preventDefault();
    Shell.beep();
    console.log('Opening file in finder');
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
      <tr className="download-item">
        <td className="hash">{this.renderHash(this.props.download.get('done'))}</td>
        <td className="download-title">
          <span>{this.handleShortenText(this.props.download.get('title'), 36)}</span>
          <span className="icon icon-search" onClick={this.handleOpenInFinder}></span>
        </td>
        <td className="download-size">
          <span>{this.handleSize(this.props.download.get('total'))}</span>
        </td>
        <td className="download-status">
          <span>{this.props.download.get('done') ? 'Done' : 'Downloading'}</span>
        </td>
        <td className="download-progress">
          {this.renderProgress({height: 14, completed: this.props.download.get('progress')})}
        </td>
      </tr>
    );
  }
});