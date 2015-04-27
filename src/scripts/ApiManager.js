'use strict';

import assign from 'object-assign';
import Request from 'superagent';
import Constants from './Constants';

let Youtube = {
  construct: function(endpoint){
    return Constants.api.baseUrl + endpoint;
  },

  request: function(endpoint, opts){
    let params = assign({}, {key: Constants.api.key}, opts);
    let url = this.construct(endpoint);
    return new Promise((resolve, reject) => {
      Request.get(url).type('application/json').accept('json').query(params).end((err, res) => {
        if(err){
          reject(err);
        }
        resolve(res);
      });
    });
  }
};

export default {
  getChannelPlaylists(channel, opts) {
    let params = {
      part: 'snippet',
      id: Constants.api.channels[channel].join(',')
    };
    let payload = assign({}, params, opts);
    return Youtube.request('playlists', payload);
  },

  getPlaylistVideos(id, opts) {
    let params = {
      part: 'snippet',
      playlistId: id,
      maxResults: 48
    };
    let payload = assign({}, params, opts);
    return Youtube.request('playlistItems', payload);
  },


  getVideoStats(videoIds, opts) {
    let params = {
      part: 'contentDetails, statistics',
      id: videoIds.join(',')
    };
    let payload = assign({}, params, opts);
    return Youtube.request('videos', payload);
  },

  getChannelPlaylistsVideos(channel) {
    var self = this;
    var videoStats = [];
    var playlistVideos = [];
    var playlists = self.getChannelPlaylists(channel).then(data => {
      var ids = data.body.items.map(playlist => {
        return {
          id: playlist.id,
          title: playlist.snippet.title
        };
      });

      ids.forEach(playlist => {
        playlistVideos.push(self.getPlaylistVideos(playlist.id, {maxResults: 4}));
      });

      return Promise.all(playlistVideos).then(data => {
        var vids = data.map(video => {
          var v = [];
          video.body.items.map(item => {
            v.push(item.snippet.resourceId.videoId);
          });
          return v;
        });

        vids.forEach(videos => {
          videoStats.push(self.getVideoStats(videos, {}));
        });

        return Promise.all(videoStats).then(stats => {
          var v = data.map((videos, idx) => {
            var vids = videos.body.items.map((video, i) => {
              return assign({}, stats[idx].body.items[i], video);
            });

            return {
              id: ids[idx].id,
              title: ids[idx].title,
              videos: vids
            };
          });

          return v;
        });
      }).then(fd => {
        return fd;
      });
    });

    return playlists;
  }
};
