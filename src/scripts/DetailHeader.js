'use strict';

import React from 'react';
import {Navigation, State} from 'react-router';
import DetailSearchbar from './DetailSearchbar';

export default React.createClass({
  mixins:[Navigation, State],

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
      <div className="detail-header">
        <div className="history">
          <a onClick={this.handleGoBack}><span className="icon icon-left"></span></a>
          <a onClick={this.handleGoForth}><span className="icon icon-right"></span></a>
        </div>
        <DetailSearchbar />
      </div>
    );
  }
});