import React from 'react';
import { Link } from 'react-router';

import AddArticleForm from './AddArticleForm';
import ArticleActions from '../../actions/ArticlesActions';
import LogoImg from '../../../images/logo.png';

var Header = React.createClass({
  addArticle(url) {
    ArticleActions.addArticle(url);
  },

  render() {
    return (
      <header className='header'>
        <div className='container'>
          <h1>
            <Link to="app"><img src={LogoImg} /></Link>
          </h1>
          <AddArticleForm onSubmitHandler={this.addArticle} />
          {this.props.children}
        </div>
      </header>
    );
  }
});

export default Header;
