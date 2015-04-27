'use strict';

import React from 'react/addons';
import Actions from './Actions';
import ChannelStore from './ChannelStore';
import Loader from './Loader';
import Playlist from './Playlist';

const PureRenderMixin = React.addons.PureRenderMixin;

export default React.createClass({
  mixins: [PureRenderMixin],

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

  renderLoader() {
    return <Loader />;
  },

  renderPlaylist(title, playlists) {
    return (
        <Playlist playlists={playlists} name={title} />
    );
  },

  render() {
    var fragment;
    var title = this.props.params.channel;
    var playlists = this.state.playlists.toArray();

    if(this.state.loading){
      fragment = this.renderLoader();
    } else {
      fragment = this.renderPlaylist(title, playlists[0]);
    }

    let page = 'channel ' + title;
    return (
      <div className={page}>
        {fragment}
      </div>
    );
  }
});
