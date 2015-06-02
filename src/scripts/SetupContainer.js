'use strict';

import React from 'react';
import {Navigation} from 'react-router';
import Actions from './Actions';
import {RenderMixin} from './Mixins';

export default React.createClass({
  mixins: [RenderMixin, Navigation],

  componentDidMount() {
    var self = this;
    Actions.fetchChannels().then(data => {
      self.transitionTo('channels', {channel: 'popular'});
    });
  },

  render() {
    return (
      <div className="setup-container">
        {this.renderLoader({
          size: 18,
          direction: 'row',
          message: 'Fetching content from youtube...'
        })}
      </div>
    );
  }
});
