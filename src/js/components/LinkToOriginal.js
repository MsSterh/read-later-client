import React from 'react';
import parseUri from 'parseUri';

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

export default LinkToOriginal;
