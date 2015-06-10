'use strict';

import React from 'react';
import {Route, DefaultRoute} from 'react-router';
import App from './AppContainer';
import Setup from './SetupContainer';
import Search from './SearchContainer';
import Detail from './DetailContainer';
import Channel from './ChannelContainer';
import Playlist from './PlaylistContainer';
import Downloads from './DownloadsContainer';

const AppRoutes = (
  <Route name="app" path="/" handler={App}>
    <Route ignoreScrollBehavior={true} name="detail" handler={Detail}>
      <Route name="channels" path="/channels/:channel" handler={Channel} />
      <Route name="playlist" path="/playlist/:playlist" handler={Playlist} />
      <Route name="search" path="/search/:query" handler={Search} />
      <Route name="downloads" path="/downloads/:group" handler={Downloads} />
    </Route>
    <DefaultRoute name="setup" handler={Setup} />
  </Route>
);

export default AppRoutes;

