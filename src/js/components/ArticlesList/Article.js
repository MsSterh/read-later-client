var React = require('react');
var LinkToOriginal = require('../LinkToOriginal');
var Link = require('react-router').Link;

var truncate = require('html-truncate');
var striptags = require('striptags');

var Article = React.createClass({
  shortContent() {
    return truncate(striptags(this.props.article.content), 400)
  },

  params() {
    return { id: this.props.id }
  },

  render() {
    return (
      <article>
        <h2>
          <Link to="article" params={this.params()}>
            {this.props.article.title}
          </Link>
        </h2>
        <p>{this.shortContent()}</p>
        <footer>
          <LinkToOriginal url={this.props.article.url} />
        </footer>
      </article>
    );
  }
});

module.exports = Article;
