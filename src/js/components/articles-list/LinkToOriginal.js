var React = require('react');
var parseUri = require('parseUri');

var LinkToOriginal = React.createClass({
  getHost() {
    return parseUri(this.props.url).host;
  },

  render() {
    return (
      <a href={this.props.url}>{this.getHost()}</a>
    );
  }
});

module.exports = LinkToOriginal;
