import React, { Component } from 'react';
import { Flex, Box } from 'reflexbox';

const Loader = () => (
  <Flex className="loader" align="center" justify="center" flexColumn>
    <Box pl={3} justify="center">Loading...</Box>
  </Flex>
)

const Playlist = ({ params }) => (
  <Flex>
    <Box auto pr={3}>
      <div className="playlist-container">
        <h3>{params.playlistId}</h3>
        <p>A {params.playlistId} playlist here!</p>
      </div>
    </Box>
  </Flex>
);

class ChannelsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    }
  }

  componentWillMount() {
    this.fetchPlaylists();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.playlistId !== nextProps.params.playlistId) {
      this.fetchPlaylists();
    }
  }

  fetchPlaylists() {
    const self = this;
    self.setState({
      isLoading: true,
    });
    setTimeout(() => {
      self.setState({
        isLoading: false,
      });
    }, 2000);
  }

  renderLoader() {
    return (
      <Loader />
    )
  }

  renderPlaylists() {
    return (
      <Playlist {...this.props} />
    )
  }

  render() {
    const { isLoading } = this.state;
    return (
      <Box auto>
        { isLoading ? this.renderLoader() : this.renderPlaylists() }
      </Box>
    );
  }
}

export default ChannelsContainer;
