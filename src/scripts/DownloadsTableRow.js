'use strict';

import React from 'react/addons';
import Actions from './Actions';
import {RenderMixin, MetaMixin} from './Mixins';

const PureRenderMixin = React.addons.PureRenderMixin;

export default React.createClass({
  propTypes: {
    download: React.PropTypes.object.isRequired
  },

  mixins: [PureRenderMixin, RenderMixin, MetaMixin],

  handleOpenInFinder(e){
    e.preventDefault();
    let filepath = this.props.download.get('path');
    Actions.show(filepath);
  },

  renderStatus() {
    if(this.props.download.get('start')){
      return 'Starting';
    }
    if(this.props.download.get('done')){
      return 'Finished';
    }
    return 'Downloading';
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
        <td className="download-hash">{this.renderHash(this.props.download.get('done'))}</td>
        <td className="download-title">
          <span>{this.handleShortenText(this.props.download.get('title'), 46)}</span>
          <span className="icon icon-open" onClick={this.handleOpenInFinder}></span>
        </td>
        <td className="download-size">
          <span>{this.handleSize(this.props.download.get('total'))}</span>
        </td>
        <td className="download-status">
          <span>{this.renderStatus()}</span>
        </td>
        <td className="download-progress">
          {this.renderProgress({height: 14, completed: this.props.download.get('progress')})}
        </td>
      </tr>
    );
  }
});