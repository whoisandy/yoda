'use strict';

var app = require('app');
var BrowserWindow = require('browser-window');
var fs = require('fs');
var ipc = require('ipc');
var path = require('path');

require('crash-reporter').start();

app.on('ready', function(){
  var mainWindow = new BrowserWindow({
    'width': 1000,
    'height': 600,
    'min-width': 1000,
    'min-height': 600,
    'resizable': false,
    'standard-window': false,
    'fullscreen': false,
    'frame': false,
    'show': false,
  });
  mainWindow.loadUrl(path.normalize('file://' + path.join(__dirname, 'index.html')));

  app.on('activate-with-no-open-windows', function () {
    if (mainWindow) {
      mainWindow.show();
    }
    return false;
  });

  app.on('before-quit', function() {
    mainWindow.webContents.send('yoda:quit');
  });

  mainWindow.webContents.on('new-window', function (e) {
    e.preventDefault();
  });

  mainWindow.on('focus', function(){
    mainWindow.webContents.send('yoda:focus');
  });

  mainWindow.on('blur', function(){
    mainWindow.webContents.send('yoda:blur');
  });

  mainWindow.webContents.on('did-finish-load', function() {
    mainWindow.setTitle('Yoda');
    mainWindow.show();
    mainWindow.focus();
  });
});
// app.on('window-all-closed', function() {
//   if (process.platform != 'darwin')
//     app.quit();
// });