'use strict';

import React from 'react/addons';
import Actions from './Actions';
import ChannelStore from './ChannelStore';
import ChannelPlaylist from './ChannelPlaylist';
import {RenderMixin, MetaMixin} from './Mixins';

const PureRenderMixin = React.addons.PureRenderMixin;

export default React.createClass({
  mixins: [PureRenderMixin, RenderMixin, MetaMixin],

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
    var page = this.handleClassNames([{
      'channel': true
    }, title]);

    if(this.props.loading){
      fragment = this.renderLoader();
    } else {
      fragment = this.renderPlaylist(title, this.state.playlists.toArray());
    }

    return this.renderFragment(page, fragment);
  }
});
