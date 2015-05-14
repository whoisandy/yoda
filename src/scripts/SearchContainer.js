'use strict';

import React from 'react/addons';
import {Navigation, State} from 'react-router';
import Loader from './Loader';

export default React.createClass({
  mixins: [Navigation, State],

  renderLoader() {
    return <Loader message="Fetching"/>
  },

  render() {
    return (
      <div className="search">
        {this.renderLoader()}
      </div>
    );
  }
});