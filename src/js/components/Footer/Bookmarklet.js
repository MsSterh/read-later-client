import React from 'react';
import source from './bookmarklet.txt';

var Bookmarklet = React.createClass({
  render() {
    return (
      <a href={source}>+ Read later</a>
    );
  }
});

export default Bookmarklet;
