'use strict';

import fs from 'fs';
import path from 'path';
import ytdl from 'ytdl-core';

export default {
  download(video, filename) {
    let id = video.id;
    let title = video.snippet.title;
    let url = 'http://youtube.com/watch?v=' + id;
    let writeStream = fs.createWriteStream(filename);
    let readStream = ytdl(url, {});
    readStream.pipe(writeStream);

    return new Promise((resolve, reject) => {
      readStream.on('error', err => {
        reject(err);
      });
      readStream.on('info', (info, format) => {
        let download = {
          id: id,
          title: title,
          total: format.size,
          stream: readStream
        };

        resolve(download);
      });
    });
  },

  notify() {
    // TODO: Ding a sound when done with downloads
  }
};
