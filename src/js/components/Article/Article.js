var React = require('react');
var Highlight = require('react-highlight');
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

        <Highlight innerHTML={true} >
          {this.props.article.content}
        </Highlight>
      </article>
    );
  }
});

module.exports = Article;
