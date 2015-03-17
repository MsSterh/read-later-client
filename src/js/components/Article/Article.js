var React = require('react');
var LinkToOriginal = require('../LinkToOriginal');

var Article = React.createClass({
  articleContent() {
    return { __html: this.props.article.content }
  },

  render() {
    return (
      <article>
        <header>
          <h1>{this.props.article.title}</h1>
          <LinkToOriginal url={this.props.article.url} />
        </header>

        <div dangerouslySetInnerHTML={this.articleContent()} />
      </article>
    );
  }
});

module.exports = Article;
