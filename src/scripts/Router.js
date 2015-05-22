'use strict';

import React from 'react';
import Router from 'react-router';
import App from './AppContainer';
import Setup from './SetupContainer';
import Detail from './DetailContainer';
import Channel from './ChannelContainer';
import Video from './VideoContainer';
import Downloads from './DownloadsContainer';
import Preferences from './PreferencesContainer';

let {Route, DefaultRoute} = Router;

let routes = (
  <Route name="app" path="/" handler={App}>
    <Route ignoreScrollBehavior={true} name="detail" handler={Detail}>
      <Route name="channels" path="/channels/:channel" handler={Channel} />
      <Route name="videos" path="/videos/:video" handler={Video} />
      <Route name="downloads" path="/downloads" handler={Downloads} />
      <Route name="preferences" path="/preferences" handler={Preferences} />
    </Route>
    <DefaultRoute name="setup" handler={Setup} />
  </Route>
);

export default Router.create({
  routes: routes
});
