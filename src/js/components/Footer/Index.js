var React = require('react');
var Bookmarklet = require('./Bookmarklet');

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

module.exports = Footer;
