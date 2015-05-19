'use strict';

import assign from 'object-assign';
import axios from 'axios';
import Constants from './Constants';

let Youtube = {
  construct: function(endpoint){
    return Constants.api.baseUrl + endpoint;
  },

  request: function(endpoint, opts){
    let params = assign({}, {key: Constants.api.key}, opts);
    let url = this.construct(endpoint);
    return axios.get(url, {params: params});
  }
};

export default {
  getChannelPlaylists(channel, opts) {
    let params = {
      fields: 'items',
      part: 'snippet',
      id: Constants.api.channels[channel].join(',')
    };
    let payload = assign({}, params, opts);
    return Youtube.request('playlists', payload);
  },

  getPlaylistItems(id, opts) {
    let params = {
      fields: 'items',
      part: 'contentDetails',
      playlistId: id
    };
    let payload = assign({}, params, opts);
    return Youtube.request('playlistItems', payload);
  },

  getVideos(ids, opts) {
    let params = {
      fields: 'items',
      part: 'snippet, contentDetails, statistics',
      id: ids.join(',')
    };
    let payload = assign({}, params, opts);
    return Youtube.request('videos', payload);
  },

  getPlaylistVideos(playlistId, opts) {

  },

  getSearchVideos(query, opts){

  },

  getChannelPlaylistVideos(channel){
    var self = this;
    var playlistPromiseStack = [];
    var playlistVideoPromiseStack = [];
    return this.getChannelPlaylists(channel).then(res => {
      var playlists = res.data.items.map(item => {
        return {
          id: item.id,
          title: item.snippet.title
        };
      });

      playlists.forEach(playlist => {
        playlistPromiseStack.push(self.getPlaylistItems(playlist.id, {maxResults: 4}));
      });

      return axios.all(playlistPromiseStack).then(res => {
        var videoIdList = res.map(playlistItem => {
          var v = []
          playlistItem.data.items.map(playlist => {
            v.push(playlist.contentDetails.videoId);
          });
          return v;
        });

        videoIdList.forEach(list => {
          playlistVideoPromiseStack.push(self.getVideos(list));
        });

        return axios.all(playlistVideoPromiseStack).then(res => {
          return res.map((videoList, idx) => {
            return {
              id: playlists[idx].id,
              title: playlists[idx].title,
              videos: videoList.data.items
            };
          });
        });
      });
    });
  }
};
