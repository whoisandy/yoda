'use strict';

import React from 'react';
import Remote from 'remote';
import Moment from 'moment';
import Utils from './Utils';
import Actions from './Actions';
import {Meta} from './Mixins';

const Dialog = Remote.require('dialog');

export default React.createClass({
  mixins: [Meta],

  handleDuration(duration) {
    var seconds = 0;
    var matches = duration.match(/[0-9]+[HMS]/g);
    matches.forEach(function (part) {
      var unit = part.charAt(part.length-1);
      var amount = parseInt(part.slice(0, -1));
      switch (unit) {
        case 'H':
          seconds = seconds + amount * 60 * 60;
          break;
        case 'M':
          seconds = seconds + amount * 60;
          break;
        case 'S':
          seconds = seconds + amount;
          break;
        default:
          break;
      }
    });
    return Moment().startOf('day').seconds(seconds).format('H:m:ss');
  },

  handlePublishedAt(date) {
    return Moment(date).fromNow();
  },

  handleViewCount(num) {
    return parseInt(num).toLocaleString() + ' views';
  },

  handleTitle(title) {
    return title.match(/Deleted\s?video/g) === null ? true : false;
  },

  handleDownload(item) {
    Dialog.showSaveDialog({
      defaultPath: Utils.home() + '/Desktop/' + item.snippet.title + '.mp4'
    }, function(filename){
      if(filename !== undefined && item){
        Actions.download(item, filename);
      } else {
        console.log('Download cancelled');
      }
    });
  },

  renderDelete() {
    return (
      <a href="#" className="video-detail">
        <p>Deleted video</p>
      </a>
    );
  },

  renderVideo(item) {
    return (
      <div className="video-detail" onClick={this.handleDownload.bind(null, item)}>
        <div className="video-image">
          <img className="image-thumbnail video-thumbnail" src={item.snippet.thumbnails.medium.url} alt={item.snippet.title} />
          <span className="duration">{this.handleDuration(item.contentDetails.duration)}</span>
        </div>
        <div className="video-title">
          <span>{this.handleShortenText(item.snippet.title, 40)}</span>
        </div>
        <div className="video-content">
          <span>{'by ' + this.handleShortenText(item.snippet.channelTitle, 20)}</span>
          <span>{this.handlePublishedAt(item.snippet.publishedAt)}</span>
        </div>
        <div className="video-stats">
          <span>{this.handleViewCount(item.statistics.viewCount)}</span>
        </div>
      </div>
    );
  },

  render() {
    var video = this.props.video, fragment;
    var title = video.snippet.title;
    if(!this.handleTitle(title)) {
      fragment = this.renderDelete();
    } else {
      fragment = this.renderVideo(video);
    }

    return (
      <div className="video">
        {fragment}
      </div>
    );
  }
});