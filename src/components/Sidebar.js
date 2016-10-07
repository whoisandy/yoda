import React from 'react';
import { Link } from 'react-router';
import { Box } from 'reflexbox';

function Sidebar() {
  return (
    <div className="sidebar">
      <Box p={3}>
        <ul>
          <li><Link to="/popular">Popular</Link></li>
          <li><Link to="/music">Music</Link></li>
          <li><Link to="/sports">Sports</Link></li>
          <li><Link to="/gaming">Gaming</Link></li>
          <li><Link to="/education">Education</Link></li>
          <li><Link to="/news">News</Link></li>
        </ul>
      </Box>
    </div>
  );
}

export default Sidebar;
