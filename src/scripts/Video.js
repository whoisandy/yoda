'use strict';

import React from 'react/addons';
import {Navigation} from 'react-router';
import Actions from './Actions';
import {RenderMixin} from './Mixins';
import VideoImage from './VideoImage';
import VideoTitle from './VideoTitle';
import VideoMeta from './VideoMeta';
import VideoDuration from './VideoDuration';

const PureRenderMixin = React.addons.PureRenderMixin;

export default React.createClass({
  mixins: [PureRenderMixin, RenderMixin, Navigation],

  isLiveVideo(item){
    let broadcastContent = item.snippet.liveBroadcastContent;
    return (broadcastContent === 'live' || broadcastContent === 'upcoming');
  },

  handleDownload(item){
    if(Actions.verify(item.id)){
      Actions.prompt(item);
    } else {
      Actions.duplicate(item).then(group => {
        this.transitionTo('downloads', {group: group});
      });
    }
  },

  handleLive(item) {
    let id = item.id;
    Actions.live(id);
  },

  handleVideo(e) {
    e.preventDefault();
    let item = this.props.video;

    if(this.isLiveVideo(item)){
      this.handleLive(item);
    } else {
      this.handleDownload(item);
    }
  },

  renderDelete() {
    return (
      <div className="video-detail">
        <p>Deleted video</p>
      </div>
    );
  },

  renderVideo(item) {
    return (
      <div className="video-detail" onClick={this.handleVideo}>
        <div className="video-image">
          <VideoImage title={item.snippet.title} src={item.snippet.thumbnails.medium.url} />
          <VideoDuration duration={item.contentDetails.duration} />
        </div>

        <div className="video-content">
          <VideoTitle title={item.snippet.title} />
          <VideoMeta channel={item.snippet.channelTitle} views={item.statistics.viewCount} published={item.snippet.publishedAt} />
        </div>
      </div>
    );
  },

  render() {
    let video = this.props.video;
    let fragment = this.renderVideo(video);

    return this.renderFragment('video', fragment);
  }
});
