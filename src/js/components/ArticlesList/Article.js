var React = require('react');
var LinkToOriginal = require('../LinkToOriginal');
var Link = require('react-router').Link;

var truncate = require('html-truncate');
var striptags = require('striptags');

var Article = React.createClass({
  shortContent() {
    return truncate(striptags(this.props.article.content), 300)
  },

  params() {
    return { id: this.props.id }
  },

  render() {
    return (
      <article>
        <Link to="article" params={this.params()}>
          <h1>
            {this.props.article.title}
          </h1>
        </Link>
        <p>{this.shortContent()}</p>
        <footer>
          <LinkToOriginal url={this.props.article.url} />
        </footer>
      </article>
    );
  }
});

module.exports = Article;
