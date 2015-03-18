var React = require('react');
var source = require('./bookmarklet.txt');

var Bookmarklet = React.createClass({
  render() {
    return (
      <a href={source}>+ Read later</a>
    );
  }
});

module.exports = Bookmarklet;
