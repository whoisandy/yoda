'use strict';
import fs from 'fs';
import ytdl from 'ytdl-core';

let DownloadManager = {
  download: function(video, filename) {
    let id = video.snippet.resourceId.videoId;
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
  }
};

export default DownloadManager;
