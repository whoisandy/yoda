'use strict';

import React from 'react';
import Loader from './Loader';

const Render = {
  renderLoader() {
    return <Loader />
  },

  renderError(msg) {
    return (
      <div className="error">
        <p>Error in connection</p>
      </div>
    );
  }
};

const Meta = {
  handleShortenText(text, maxLength) {
    var ret = text;
    if (ret.length > maxLength) {
      ret = ret.substr(0, maxLength-3) + '...';
    }
    return ret;
  }
};

export default {
  Meta: Meta,
  Render: Render
}