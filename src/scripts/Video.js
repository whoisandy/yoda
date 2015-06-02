'use strict';

import Remote from 'remote';
import React from 'react';
import {Navigation} from 'react-router';
import Actions from './Actions';
import Utils from './Utils';
import {RenderMixin} from './Mixins';
import VideoImage from './VideoImage';
import VideoTitle from './VideoTitle';
import VideoMeta from './VideoMeta';
import VideoDuration from './VideoDuration';

const Dialog = Remote.require('dialog');
const Shell = Remote.require('shell');

export default React.createClass({
  mixins: [RenderMixin, Navigation],

  isLiveVideo(item){
    let broadcastContent = item.snippet.liveBroadcastContent;
    return (broadcastContent === 'live' || broadcastContent === 'upcoming');
  },

  handleDownload(item){
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

  handleLive(item) {
    Dialog.showMessageBox({
      type: 'warning',
      buttons: ['Watch on youtube', 'Cancel'],
      title: 'Live broadcast content',
      message: 'Live or Upcoming videos cannot be downloaded.'
    }, function(res){
      if(res === 0){
        Shell.openExternal('http://youtube.com/watch?v=' + item.id);
      }
    });
  },

  handleVideo(e) {
    e.preventDefault();
    let item = this.props.video;
    console.log(item);

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
    let {current} = this.props;
    let video = this.props.video;
    let title = video.snippet.title;
    let fragment = this.renderVideo(video);

    return this.renderFragment('video', fragment);
  }
});
