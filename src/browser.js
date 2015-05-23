'use strict';

const app = require('app');
const BrowserWindow = require('browser-window');
const fs = require('fs');
const ipc = require('ipc');
const path = require('path');

require('crash-reporter').start();

app.on('ready', function(){
  let mainWindow = new BrowserWindow({
    'width': 1000,
    'height': 600,
    'min-width': 1000,
    'min-height': 600,
    'resizable': false,
    'fullscreen': false,
    'frame': false,
    'show': true
  });

  mainWindow.loadUrl(path.normalize('file://' + path.join(__dirname, 'index.html')));
  // mainWindow.loadUrl('http://localhost:6789');

  app.on('activate-with-no-open-windows', function () {
    if (mainWindow) {
      mainWindow.show();
    }
    return false;
  });

  mainWindow.webContents.on('did-finish-load', function() {
    mainWindow.setTitle('Youdown');
    mainWindow.show();
    mainWindow.focus();
  });
});

app.on('window-all-closed', function() {
  if (process.platform != 'darwin')
    app.quit();
});