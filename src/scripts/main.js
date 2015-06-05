'use strict';

import ipc from 'ipc';
import React from 'react';
import Join from 'react/lib/joinClasses';
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

  let mountNode = document.body.children[0];

  ipc.on('yoda:quit', () => {
    localStorage.removeItem('channels');
  });

  ipc.on('yoda:focus', () => {
    mountNode.className = 'app-container';
  });

  ipc.on('yoda:blur', () => {
    mountNode.className += ' app-blur';
  });

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