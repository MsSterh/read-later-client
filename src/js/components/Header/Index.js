var React = require('react');
var Link = require('react-router').Link;

var AddArticleForm = require('./AddArticleForm');
var ArticleActions = require('../../actions/ArticlesActions');

var Header = React.createClass({
  addArticle(url) {
    ArticleActions.addArticle(url);
  },

  render() {
    return (
      <div className='header-container'>
        <header>
          <h1>
            <Link to="app">Read Now</Link>
          </h1>
          <AddArticleForm onSubmitHandler={this.addArticle} />
          {this.props.children}
        </header>
      </div>
    );
  }
});

module.exports = Header;
