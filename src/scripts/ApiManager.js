'use strict';

import axios from 'axios';
import cheerio from 'cheerio';
import assign from 'object-assign';
import Constants from './Constants';

const Youtube = {
  construct(endpoint, scrape) {
    if(scrape){
      return Constants.api.youtubeUrl + endpoint;
    }
    return Constants.api.baseUrl + endpoint;
  },

  scrape(endpoint) {
    let url = this.construct(endpoint, true);
    return axios.get(url);
  },

  request(endpoint, opts) {
    let params = assign({}, {key: Constants.api.key}, opts);
    let url = this.construct(endpoint);
    return axios.get(url, {params: params});
  }
};

export default {
  _playlists(channel, opts) {
    let pls = JSON.parse(localStorage.getItem('channels'));
    let params = {
      fields: 'items',
      part: 'snippet',
      id: pls[channel].join(',')
    };
    let payload = assign({}, params, opts);
    return Youtube.request('playlists', payload);
  },

  _playlist(playlistId, opts) {
    let params = {
      fields: 'items',
      part: 'snippet',
      id: playlistId
    };
    let payload = assign({}, params, payload);
    return Youtube.request('playlists', payload);
  },

  _playlistItems(id, opts) {
    let params = {
      fields: 'etag, items, prevPageToken, nextPageToken',
      part: 'snippet, contentDetails',
      playlistId: id
    };
    let payload = assign({}, params, opts);
    return Youtube.request('playlistItems', payload);
  },

  _search(query, opts){
    let params = {
      fields: 'etag, items, prevPageToken, nextPageToken',
      part: 'snippet',
      q: query
    };
    let payload = assign({}, params, opts);
    return Youtube.request('search', payload);
  },

  _videos(ids, opts) {
    let params = {
      fields: 'items',
      part: 'snippet, contentDetails, statistics',
      id: ids.join(',')
    };
    let payload = assign({}, params, opts);
    return Youtube.request('videos', payload);
  },

  getChannels() {
    let playlistPromises = [];
    let channels = Constants.api.channels;

    playlistPromises = Object.keys(channels).map(k => {
      let pids = [];
      return Youtube.scrape(channels[k]).catch(err => {return err}).then(res => {
        let $ = cheerio.load(res.data);
        let playlistIdHref = $('h2.branded-page-module-title > a');
        let ids = playlistIdHref.map((idx, el) => {
          let id = $(el).attr('href');
          if(id.match(/playlist\?list=/)){
            pids.push(id.split('=')[1]);
          }
        });

        return pids;
      });
    });

    return Promise.all(playlistPromises).then(data => {
      let playlists = {};
      data.forEach((val, idx) => {
        playlists[Object.keys(channels)[idx]] = val;
      });
      return playlists;
    }).then(playlists => {
      localStorage.setItem('channels', JSON.stringify(playlists));
      return playlists;
    }).catch(err => {
      console.log(err);
      return err;
    });
  },

  getChannelPlaylistVideos(channel){
    let self = this;
    let playlistPromiseStack = [];
    let playlistVideoPromiseStack = [];
    return this._playlists(channel).then(res => {
      let playlists = res.data.items.map(item => {
        return {
          id: item.id,
          title: item.snippet.title
        };
      });

      playlists.forEach(playlist => {
        playlistPromiseStack.push(self._playlistItems(playlist.id, {maxResults: 4}));
      });

      return axios.all(playlistPromiseStack).then(res => {
        let videoIdList = res.map(playlistItem => {
          let v = [];
          playlistItem.data.items.map(playlist => {
            v.push(playlist.contentDetails.videoId);
          });
          return v;
        });


        videoIdList.forEach(list => {
          playlistVideoPromiseStack.push(self._videos(list));
        });

        return axios.all(playlistVideoPromiseStack).then(res => {
          return res.map((videoList, idx) => {
            let videos = {
              id: playlists[idx].id,
              title: playlists[idx].title,
              videos: videoList.data.items
            };
            return videos;
          });
        });
      });
    });
  },

  getPlaylistVideos(playlistId, page) {
    let self = this;
    let pageToken = page || '';
    return this._playlist(playlistId).then(res => {
      let playlist = res.data.items.map(item => {
        return {
          id: item.id,
          title: item.snippet.title
        };
      }).pop();

      return self._playlistItems(playlist.id, {maxResults: 24, pageToken: pageToken}).then(res => {
        let etag = res.data.etag;
        let next = res.data.nextPageToken;
        let videoIds = res.data.items.map(item => {
          return item.contentDetails.videoId;
        });

        return self._videos(videoIds).then(res => {
          return {
            id: playlist.id,
            etag: etag,
            title: playlist.title,
            videos: res.data.items,
            next: next
          }
        });
      });
    });
  },

  paginatePlaylistVideos(playlistId, page) {
    return this.getPlaylistVideos(playlistId, page);
  },

  getSearchResultVideos(query, page) {
    let self = this;
    let pageToken = page || '';
    return this._search(query, {maxResults: 24, pageToken: pageToken}).then(res => {
      let etag = res.data.etag;
      let next = res.data.nextPageToken;
      let results = res.data.items.map(item => {
        return item.id.videoId;
      });

      return self._videos(results).then(res => {
        return {
          etag: etag,
          query: query,
          videos: res.data.items,
          next: next
        };
      });
    });
  },

  paginateSearchResultVideos(query, next) {
    return this.getSearchResultVideos(query, next);
  }
};
