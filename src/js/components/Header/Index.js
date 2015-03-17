var React = require('react');
var Link = require('react-router').Link;

var AddArticleForm = require('./AddArticleForm');
var ArticleActions = require('../../actions/ArticleActions');

var Header = React.createClass({
  addArticle(url) {
    ArticleActions.addArticle(url);
  },

  render() {
    return (
      <header>
        <h1>
          <Link to="app">Read Now</Link>
        </h1>
        <AddArticleForm onSubmitHandler={this.addArticle} />
        {this.props.children}
      </header>
    );
  }
});

module.exports = Header;
