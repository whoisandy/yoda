'use strict';

import React from 'react';
import Router from 'react-router';
import App from './AppContainer';
import Channel from './ChannelContainer';
import Downloads from './DownloadsContainer';
import Preferences from './PreferencesContainer';

let {Route, DefaultRoute} = Router;

let routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="channels" path="/channels/:channel" handler={Channel} />
    <Route name="downloads" path="/downloads" handler={Downloads} />
    <Route name="preferences" path="/preferences" handler={Preferences} />
  </Route>
);

export default Router.create({
  routes: routes
});
