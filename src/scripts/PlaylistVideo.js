'use strict';

import React from 'react';
import ReactIntl from 'react-intl';
import {Navigation} from 'react-router';
import Actions from './Actions';
import Utils from './Utils';
import {RenderMixin, MetaMixin} from './Mixins';
import VideoImage from './VideoImage';
import VideoDuration from './VideoDuration';

const IntlMixin = React.IntlMixin;

export default React.createClass({
  mixins: [RenderMixin, IntlMixin, MetaMixin, Navigation],

  handleVideo(item) {
    console.log(item);
    this.transitionTo('videos', {
      video: item.id
    }, {
      title: item.snippet.title,
      viewCount: item.statistics.viewCount
    });
  },

  renderDelete() {
    return (
      <div className="video-detail">
        <p>Deleted video</p>
      </div>
    );
  },

  // Duration after image thumbnail
  renderVideo(item) {
    return (
      <div className="video-detail" onClick={this.handleVideo.bind(null, item)}>
        <div className="video-image">
          <VideoImage title={item.snippet.title} src={item.snippet.thumbnails.medium.url} />
          <VideoDuration duration={item.contentDetails.duration} />
        </div>
        <div className="video-title">
          <a href="#">{item.snippet.title}</a>
        </div>
        <div className="video-content">
          <span>{'by ' + item.snippet.channelTitle}</span>
          <ul>
            <li>{this.handleViewCount(item.statistics.viewCount)}</li>
            <li>{this.handlePublishedAt(item.snippet.publishedAt)}</li>
          </ul>
        </div>
      </div>
    );
  },

  render() {
    var fragment;
    var video = this.props.video;
    var title = video.snippet.title;

    if(!this.handleTitle(title)) {
      fragment = this.renderDelete();
    } else {
      fragment = this.renderVideo(video);
    }

    return this.renderFragment('video', fragment);
  }
});