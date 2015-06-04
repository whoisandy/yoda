'use strict';

import Remote from 'remote';
import React from 'react';
import Join from 'react/lib/joinClasses';
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
        <div className="buttons">
          <div className="lights">
            <div className="light light-red enabled" onClick={this.handleClose}></div>
            <div className="light light-yellow enabled" onClick={this.handleMinimize}></div>
          </div>
        </div>
        <div className="header">
          <div className="history">
            <div className="btn-group">
              <a className="btn btn-sm btn-default" onClick={this.handleGoBack}><span className="icon icon-left"></span></a>
              <a className="btn btn-sm btn-default disabled" onClick={this.handleGoForth}><span className="icon icon-right"></span></a>
            </div>
          </div>
          <TitlebarSearch />
        </div>
      </div>
    );
  }
});
