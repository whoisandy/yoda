'use strict';

import React from 'react';
import {Navigation, State} from 'react-router';
import Remote from 'remote';

export default React.createClass({
  mixins: [Navigation, State],

  handleClose() {
    Remote.getCurrentWindow().hide();
  },

  handleMinimize() {
    Remote.getCurrentWindow().minimize();
  },

  render() {
    return (
      <div className="titlebar no-drag">
        <div className="buttons-container">
          <div className="buttons">
            <div className="button button-close enabled" onClick={this.handleClose}></div>
            <div className="button button-minimize enabled" onClick={this.handleMinimize}></div>
            <div className="button button-fullscreenclose disabled"></div>
          </div>
        </div>
      </div>
    );
  }
});
