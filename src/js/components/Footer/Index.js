import React from 'react';
import Bookmarklet from './Bookmarklet';

var Footer = React.createClass({
  render() {
    return (
      <footer>
	    <div className='container'>
          <span>Bookmarklet</span>
          <Bookmarklet />
          <p>Use bookmarklet for easy way to add you reading. Just add it to your toolbar and click on it when you will be on reading page!</p>
        </div>
      </footer>
    );
  }
});

export default Footer;
