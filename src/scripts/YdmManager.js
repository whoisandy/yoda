'use strict';

import fs from 'fs';
import path from 'path';
import sfx from 'sfx';
import ytdl from 'ytdl-core';
import remote from 'remote';

const dialog = remote.require('dialog');
const shell = remote.require('shell');

export default {
  parse(obj) {
    return JSON.parse(obj);
  },

  verify(id, filename) {
    let downloads = this.parse(localStorage.getItem('downloads'));
    if(downloads !== null){
      let videos = downloads.DownloadsStore.map(download => {
        return download.id;
      });
      if(videos.indexOf(id) > -1 || fs.existsSync(filename)){
        return false;
      }
    }
    return true;
  },

  prompt(item, filepath) {
    return new Promise(resolve => {
      dialog.showSaveDialog({
        title: 'Download video',
        defaultPath: filepath
      }, function(filename){
          if(filename !== undefined && item){
            resolve(true);
          } else {
            resolve(false);
          }
        });
      });
  },

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

  duplicate(item) {
    let downloads = this.parse(localStorage.getItem('downloads'));
    let video = downloads.DownloadsStore.filter(download => {
      return item.id === download.id;
    }).shift();
    let message = (video.done ? 'The video has already been downloaded.' : 'The video is currently being downloaded.');

    return new Promise(resolve => {
      dialog.showMessageBox({
        type: 'info',
        buttons: ['Go to downloads', 'Cancel'],
        message: message
      }, function(res){
        if(res === 0){
          if(!video.done){
            resolve('active')
          }
          resolve('complete');
        }
      });
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
        title: 'Video not found',
        message: 'The video must have been moved or deleted.'
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

  clear(store) {
    localStorage.removeItem(store);
  },

  notify() {
    sfx.glass();
  }
};
