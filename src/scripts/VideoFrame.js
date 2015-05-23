'use strict';

import React from 'react';
import Join from 'react/lib/joinClasses';

export default React.createClass({
  propTypes: {
    video: React.PropTypes.string.isRequired
  },

  getInitialState() {
    return {
      loaded: false
    };
  },

  componentDidMount() {
    var iframeTag = React.findDOMNode(this.refs.video);
    var iframeSrc = iframeTag.getAttribute('src');
    iframeTag.addEventListener('load', this.onFrameLoad);
    iframeTag.src = iframeSrc;
  },

  onFrameLoad() {
    if(this.isMounted()){
      this.setState({
        loaded: true
      });
    }
  },

  handleFrameUrl(videoId) {
    return `http://youtube.com/embed/${videoId}?&autoplay=1&modestbranding=1&showinfo=0`;
  },

  render() {
    var frameClass = 'frame';
    if (this.state.loaded) {
      frameClass = Join(frameClass, 'frame-loaded');
    }
    return (
      <div className="video-frame">
        <iframe
          ref="video"
          type="text/html"
          className={frameClass}
          src={this.handleFrameUrl(this.props.video)}
          accesscontrol
          frameBorder="0"></iframe>
      </div>
    );
  }
});