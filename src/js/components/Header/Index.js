import React from 'react';
import { Link } from 'react-router';

import AddArticleForm from './AddArticleForm';
import ArticleActions from '../../actions/ArticlesActions';

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

export default Header;
