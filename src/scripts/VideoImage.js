'use strict';

import React from 'react';
import Join from 'react/lib/joinClasses';
import VideoDuration from './VideoDuration';

export default React.createClass({
  componentDidMount() {
    var imgTag = React.findDOMNode(this.refs.image);
    var imgSrc = imgTag.getAttribute('src');

    var img = new window.Image();
    img.src = imgSrc;
  },

  shouldComponentUpdate(nextProps) {
    return this.props.src !== nextProps.src;
  },

  render() {
    var imgClasses = 'video-thumbnail image-thumbnail';
    return (
      <img ref="image" className={imgClasses} {...this.props} />
    );
  }
});
