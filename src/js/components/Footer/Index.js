import React from 'react';
import Bookmarklet from './Bookmarklet';

var Footer = React.createClass({
  render() {
    return (
      <div className='footer-container'>
        <footer>
          Bookmarklet <Bookmarklet />
        </footer>
      </div>
    );
  }
});

export default Footer;
