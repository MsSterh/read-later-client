import React from 'react';
import Bookmarklet from './Bookmarklet';

var Footer = React.createClass({
  render() {
    return (
      <footer>
	    <div className='container'>
          <span>Bookmarklet</span>
          <Bookmarklet />
          <p>
            If you're using a browser that supports it, you should be able to click
            and drag the bookmarklet above to your bookmarks or favorites bar.

            Next when you will be on the page that you want to read later just click on your bookmarklet.
          </p>
        </div>
      </footer>
    );
  }
});

export default Footer;
