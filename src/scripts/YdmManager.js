'use strict';

import fs from 'fs';
import path from 'path';
import sfx from 'sfx';
import ytdl from 'ytdl-core';

export default {
  download(video, filename) {
    let url = `http://youtube.com/watch?v=${video.id}`;
    let writeStream = fs.createWriteStream(filename);
    let readStream = ytdl(url, {});
    readStream.pipe(writeStream);

    return new Promise((resolve, reject) => {
      readStream.on('error', err => {
        reject(err);
      });
      readStream.on('info', (info, format) => {
        let download = {
          id: video.id,
          title: video.snippet.title,
          total: format.size,
          stream: readStream
        };

        resolve(download);
      });
    });
  },

  save(store, state) {
    localStorage.setItem(store, state);
  },

  load(store) {
    return localStorage.getItem(store);
  },

  notify() {
    sfx.glass();
  }
};
