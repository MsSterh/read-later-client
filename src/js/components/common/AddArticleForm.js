var React = require('react');
var ArticleActions = require('../../actions/ArticleActions');

var AddArticleForm = React.createClass({
  addArticle(e) {
    e.preventDefault();
    var url = this.refs.url.getDOMNode().value.trim();
    this.refs.url.getDOMNode().value = '';
    ArticleActions.addArticle(url);
  },

  render() {
    return (
      <form onSubmit={this.addArticle}>
        <input type="text" placeholder="http://..." ref="url" />
        <input type="submit" value="Add" />
      </form>
    );
  }
});

module.exports = AddArticleForm;
