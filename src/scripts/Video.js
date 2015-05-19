'use strict';

import React from 'react';
import {Navigation} from 'react-router';
import Actions from './Actions';
import {RenderMixin, MetaMixin} from './Mixins';
import VideoImage from './VideoImage';

export default React.createClass({
  mixins: [RenderMixin, MetaMixin, Navigation],

  handleVideo(item) {
    this.transitionTo('videos', {video: item});
  },

  renderDelete() {
    return (
      <div href="#" className="video-detail">
        <p>Deleted video</p>
      </div>
    );
  },

  // Duration after image thumbnail
  renderVideo(item) {
    return (
      <div className="video-detail" onClick={this.handleVideo.bind(null, item)}>
        <VideoImage title={item.snippet.title} image={item.snippet.thumbnails.medium.url} duration={item.contentDetails.duration} />
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
    var page = this.handleClassNames({
      'video': true
    });

    if(!this.handleTitle(title)) {
      fragment = this.renderDelete();
    } else {
      fragment = this.renderVideo(video);
    }

    return this.renderFragment(page, fragment);
  }
});