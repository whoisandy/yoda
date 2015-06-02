'use strict';

import Ipc from 'ipc';
import Remote from 'remote';
import React from 'react';

import Utils from './Utils';
import Router from './Router';

/**
 * Setup application menu here
 */
// let Menu = Remote.require('menu');
// let MenuTemplate = Utils.menuTemplate();
// let AppMenuTemplate = Menu.buildFromTemplate(MenuTemplate);
// Menu.setApplicationMenu(AppMenuTemplate);

// Run after all promises satisfied
function bootstrap(){
  // Debugging purpose
  Utils.addLiveReload();
  Utils.disableGlobalBackspace();

  Ipc.on('yoda:quitting', () => {
    localStorage.removeItem('channels');
  });

  let mountNode = document.querySelector('.app-container');
  Router.run((Root, state) => {
    var params = state.params;
    React.render(<Root params={params} />, mountNode);
  });
}

Promise.all([
  new Promise((resolve) => {
    if (window.addEventListener) {
      window.addEventListener('DOMContentLoaded', resolve);
    } else {
      window.attachEvent('onload', resolve);
    }
  })
]).then(bootstrap);