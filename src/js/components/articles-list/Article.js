var React = require('react');
var LinkToOriginal = require('./LinkToOriginal');

var truncate = require('html-truncate');
var striptags = require('striptags');

var Article = React.createClass({
  articleContent() {
    return { __html: truncate(striptags(this.props.article.content), 400) }
  },

  render() {
    return (
      <div>
        <h2>
          {this.props.article.title}
        </h2>
        <p dangerouslySetInnerHTML={this.articleContent()} />
        <LinkToOriginal url={this.props.article.url} />
      </div>
    );
  }
});

module.exports = Article;
