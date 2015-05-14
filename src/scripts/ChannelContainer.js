'use strict';

import React from 'react/addons';
import Actions from './Actions';
import ChannelStore from './ChannelStore';
import ChannelPlaylist from './ChannelPlaylist';
import {Render} from './Mixins';

const PureRenderMixin = React.addons.PureRenderMixin;

export default React.createClass({
  mixins: [PureRenderMixin, Render],

  getInitialState(){
    return ChannelStore.getState();
  },

  componentDidMount() {
    ChannelStore.listen(this.onChange);
    Actions.fetchPlaylists(this.props.params.channel);
  },

  componentWillUnmount() {
    ChannelStore.unlisten(this.onChange);
  },

  onChange() {
    this.setState(ChannelStore.getState());
  },

  renderPlaylist(title, playlists) {
    return (
        <ChannelPlaylist playlists={playlists} name={title} />
    );
  },

  render() {
    var fragment;
    var title = this.props.params.channel;
    var page = 'channel ' + title;
    var playlists = this.state.playlists.toArray();

    if(this.props.loading){
      fragment = this.renderLoader();
    } else {
      fragment = this.renderPlaylist(title, playlists[0]);
    }

    return (
      <div className={page}>
        {fragment}
      </div>
    );
  }
});
