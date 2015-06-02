'use strict';

import Remote from 'remote';
import React from 'react';
import {Navigation, State} from 'react-router';
import TitlebarSearch from './TitlebarSearch';

export default React.createClass({
  mixins: [Navigation, State],

  handleClose() {
    Remote.getCurrentWindow().hide();
  },

  handleMinimize() {
    Remote.getCurrentWindow().minimize();
  },

  handleGoBack(e) {
    e.preventDefault();
    if(this.getParams().channel !== 'popular'){
      this.goBack();
    }
  },

  // Think about history here
  handleGoForth() {

  },

  render() {
    return (
      <div className="titlebar no-drag">
        <div className="titlebar-buttons">
          <div className="buttons">
            <div className="button button-close enabled" onClick={this.handleClose}></div>
            <div className="button button-minimize enabled" onClick={this.handleMinimize}></div>
            <div className="button button-fullscreenclose disabled"></div>
          </div>
        </div>
        <div className="titlebar-header">
          <div className="history">
            <a onClick={this.handleGoBack}><span className="icon icon-left"></span></a>
            <a onClick={this.handleGoForth}><span className="icon icon-right"></span></a>
          </div>
          <TitlebarSearch />
        </div>
      </div>
    );
  }
});
