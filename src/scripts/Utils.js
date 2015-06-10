'use strict';

import remote from 'remote'
import router from './Router';

const app = remote.require('app');

export default {
  inspect() {
    if(process.env.NODE_ENV === 'development') {
      remote.getCurrentWindow().inspectElement(0,0);
    }
  },

  addLiveReload() {
    if (process.env.NODE_ENV === 'development') {
      var head = document.getElementsByTagName('head')[0];
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'http://localhost:35729/livereload.js';
      head.appendChild(script);
    }
  },

  disableGlobalBackspace() {
    document.onkeydown = function (e) {
      e = e || window.event;
      var doPrevent;
      if (e.keyCode === 8) {
        var d = e.srcElement || e.target;
        if (d.tagName.toUpperCase() === 'INPUT' || d.tagName.toUpperCase() === 'TEXTAREA') {
          doPrevent = d.readOnly || d.disabled;
        } else {
          doPrevent = true;
        }
      } else {
        doPrevent = false;
      }
      if (doPrevent) {
        e.preventDefault();
      }
    };
  },

  menu() {
    return [
      {
        label: 'Yoda',
        submenu: [
          {
            label: 'About Yoda',
            selector: 'orderFrontStandardAboutPanel:'
          },
          {
            type: 'separator'
          },
          {
            label: 'Hide Yoda',
            accelerator: 'Cmd+H',
            selector: 'hide:'
          },
          {
            label: 'Hide Others',
            accelerator: 'Cmd+Shift+H',
            selector: 'hideOtherApplications:'
          },
          {
            label: 'Show All',
            selector: 'unhideAllApplications:'
          },
          {
            type: 'separator'
          },
          {
            label: 'Quit',
            accelerator: 'Cmd+Q',
            click: function() {
              app.quit();
            }
          }
        ]
      },
      {
        label: 'File',
        submenu: [
          {
            type: 'separator'
          },
          {
            label: 'Show active downloads',
            accelerator: 'Cmd+D',
            click: function() {
              router.get().transitionTo('downloads', {group: 'active'});
            }
          },
          {
            label: 'Show finished downloads',
            accelerator: 'Cmd+Shift+D',
            click: function() {
              router.get().transitionTo('downloads', {group: 'complete'});
            }
          }
        ]
      },
      {
        label: 'Edit',
        submenu: [
          {
            label: 'Undo',
            accelerator: 'Cmd+Z',
            selector: 'undo:'
          },
          {
            label: 'Redo',
            accelerator: 'Cmd+Shift+Z',
            selector: 'redo:'
          },
          {
            type: 'separator'
          },
          {
            label: 'Cut',
            accelerator: + 'Cmd+X',
            selector: 'cut:'
          },
          {
            label: 'Copy',
            accelerator: 'Cmd+C',
            selector: 'copy:'
          },
          {
            label: 'Paste',
            accelerator: 'Cmd+V',
            selector: 'paste:'
          },
          {
            label: 'Select All',
            accelerator: 'Cmd+A',
            selector: 'selectAll:'
          }
        ]
      },
      {
        label: 'Window',
        submenu: [
          {
            label: 'Minimize',
            accelerator: 'Cmd+M',
            selector: 'performMiniaturize:'
          },
          {
            label: 'Close',
            accelerator: 'Cmd+W',
            click: function () {
              remote.getCurrentWindow().hide();
            }
          },
          {
            type: 'separator'
          },
          {
            label: 'Bring All to Front',
            selector: 'arrangeInFront:'
          }
        ]
      },
      {
        label: 'Help',
        submenu: [
          {
            label: 'Report Issue or Suggest Feedback',
            click: function () {
              remote.require('shell').openExternal('https://github.com/whoisandie/yoda/issues/new');
            }
          }
        ]
      }
    ];
  }
};
