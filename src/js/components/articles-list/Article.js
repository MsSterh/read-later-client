var React = require('react');
var truncate = require('html-truncate');
var striptags = require('striptags');
var parseUri = require('parseUri');

var Index = React.createClass({
  getHost() {
    return parseUri(this.props.article.url).host;
  },

  articleContent() {
    return { __html: truncate(striptags(this.props.article.content), 400) }
  },

  render() {
    console.log(this.getHost());
    return (
      <div>
        <h2>
          {this.props.article.title}
        </h2>
        <p dangerouslySetInnerHTML={this.articleContent()} />
        <a href={this.props.article.url}>
          {this.getHost()}
        </a>
      </div>
    );
  }
});

module.exports = Index;
