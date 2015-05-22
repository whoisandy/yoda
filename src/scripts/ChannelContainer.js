'use strict';

import React from 'react/addons';
import Join from 'react/lib/joinClasses';
import Actions from './Actions';
import ChannelStore from './ChannelStore';
import ChannelPlaylist from './ChannelPlaylist';
import {RenderMixin} from './Mixins';

const PureRenderMixin = React.addons.PureRenderMixin;

export default React.createClass({
  mixins: [PureRenderMixin, RenderMixin],

  getInitialState(){
    return ChannelStore.getState();
  },

  componentDidMount() {
    ChannelStore.listen(this.onChange);
    Actions.fetchChannelPlaylists(this.props.params.channel);
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
    var page = Join('channel', title);

    if(this.props.loading){
      fragment = this.renderLoader({message: 'Loading channel playlists...'});
    } else {
      fragment = this.renderPlaylist(title, this.state.playlists.toArray());
    }

    return this.renderFragment(page, fragment);
  }
});
