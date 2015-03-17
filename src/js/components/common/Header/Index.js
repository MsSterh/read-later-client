var React = require('react');
var Link = require('react-router').Link;

var AddArticleForm = require('./AddArticleForm');
var UnreadFilter = require('./UnreadFilter');
var ArticleActions = require('../../../actions/ArticleActions');

var Header = React.createClass({
  addArticle(url) {
    ArticleActions.addArticle(url);
  },

  render() {
    return (
      <header>
        <AddArticleForm onSubmitHandler={this.addArticle} />
        <UnreadFilter />
        <h1>
          <Link to="app">Read Now</Link>
        </h1>
        {this.props.children}
      </header>
    );
  }
});

module.exports = Header;
