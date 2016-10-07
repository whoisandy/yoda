import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Redirect } from 'react-router';
import { Flex } from 'reflexbox';
import {
  Channels,
  Downloads,
} from './containers';
import { Sidebar } from './components';
import './index.css';

const mount = document.getElementById('root');

const Yoda = () => (
  <BrowserRouter>
    <Flex className="yoda-container" flexColumn>
      <Flex flexAuto>
        <Sidebar />
        <Flex flexAuto p={3}>
          <Match pattern="/:playlistId" component={Channels} />
          <Match pattern="/downloads" component={Downloads} />
          <Match pattern="/" exactly render={() => (
            <Redirect to="/popular" />
          )} />
        </Flex>
      </Flex>
    </Flex>
  </BrowserRouter>
);

render(<Yoda />, mount);
