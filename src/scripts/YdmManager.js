'use strict';

import fs from 'fs';
import path from 'path';
import sfx from 'sfx';
import ytdl from 'ytdl-core';

import remote from 'remote';

const dialog = remote.require('dialog');
const shell = remote.require('shell');

export default {
  download(video, filename) {
    let url = `http://youtube.com/watch?v=${video.id}`;
    let writeStream = fs.createWriteStream(filename);
    let readStream = ytdl(url, {});
    readStream.pipe(writeStream);

    let download = {
      id: video.id,
      title: video.snippet.title,
      path: filename,
      stream: readStream
    };

    return new Promise((resolve, reject) => {
      readStream.on('error', err => {
        reject(err);
      });

      resolve(download);
    });
  },

  live(id) {
    dialog.showMessageBox({
      type: 'warning',
      buttons: ['Watch on youtube', 'Cancel'],
      title: 'Live broadcast content',
      message: 'Live or Upcoming videos cannot be downloaded.'
    }, function(res){
      if(res === 0){
        shell.openExternal('http://youtube.com/watch?v=' + id);
      }
    });
  },

  show(filepath) {
    if(!fs.existsSync(filepath)){
      dialog.showMessageBox({
        type: 'warning',
        buttons: ['Ok'],
        title: 'File not found',
        message: 'The file must have been moved or deleted.'
      });
    } else {
      shell.showItemInFolder(filepath);
    }
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
