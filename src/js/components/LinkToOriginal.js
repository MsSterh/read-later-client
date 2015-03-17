var React = require('react');
var parseUri = require('parseUri');

var LinkToOriginal = React.createClass({
  getHost() {
    var host = parseUri(this.props.url).host;
    return host === 'undefined' ? '' : host;
  },

  render() {
    return (
      <a href={this.props.url}>{this.getHost()}</a>
    );
  }
});

module.exports = LinkToOriginal;
