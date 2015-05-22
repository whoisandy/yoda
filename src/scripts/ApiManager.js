'use strict';

import axios from 'axios';
import cheerio from 'cheerio';
import assign from 'object-assign';
import Constants from './Constants';

const Youtube = {
  construct: function(endpoint, scrape){
    if(scrape){
      return Constants.api.youtubeUrl + endpoint;
    }
    return Constants.api.baseUrl + endpoint;
  },

  scrape(endpoint) {
    let url = this.construct(endpoint, true);
    return axios.get(url);
  },

  request: function(endpoint, opts){
    let params = assign({}, {key: Constants.api.key}, opts);
    let url = this.construct(endpoint);
    return axios.get(url, {params: params});
  }
};

export default {
  getChannels() {
    var playlistPromises = [];
    var channels = Constants.api.channels;

    var playlistPromises = Object.keys(channels).map(k => {
      var pids = [];
      return Youtube.scrape(channels[k]).then(res => {
        var $ = cheerio.load(res.data);
        var playlistIdHref = $('h2.branded-page-module-title > a');
        var ids = playlistIdHref.map((idx, el) => {
          var id = $(el).attr('href');
          if(id.match(/playlist\?list=/)){
            pids.push(id.split('=')[1]);
          }
        });

        return pids;
      });
    });

    return Promise.all(playlistPromises).then(data => {
      var playlists = {};
      data.forEach((val, idx) => {
        playlists[Object.keys(channels)[idx]] = val;
      });
      return playlists;
    }).then(playlists => {
      localStorage.setItem('playlists', JSON.stringify(playlists));
      return playlists;
    }).catch(err => {
      return err;
    });
  },

  getChannelPlaylists(channel, opts) {
    var pls = JSON.parse(localStorage.getItem('playlists'));
    let params = {
      fields: 'items',
      part: 'snippet',
      id: pls[channel].join(',')
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
            var videos = {
              id: playlists[idx].id,
              title: playlists[idx].title,
              videos: videoList.data.items
            };
            return videos;
          });
        });
      });
    });
  }
};
