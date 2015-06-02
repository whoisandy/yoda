'use strict';

import React from 'react';
import {Navigation} from 'react-router';
import Actions from './Actions';
import {RenderMixin} from './Mixins';

export default React.createClass({
  mixins: [RenderMixin, Navigation],

  componentDidMount() {
    Actions.fetchChannels().then(data => {
      this.transitionTo('channels', {channel: 'popular'});
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
