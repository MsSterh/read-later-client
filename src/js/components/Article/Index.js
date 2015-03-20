import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

import Header from '../Header/Index';
import Article from './Article';

import ArticleStore from '../../stores/ArticleStore';
import ArticleActions from '../../actions/ArticleActions';

var ArticleComponent = React.createClass({
  mixins: [
    Reflux.listenTo(ArticleStore, 'onArticleUpdate'),
    Router.State,
    Router.Navigation
  ],

  getInitialState() {
    return {
      article: ArticleStore.getArticle(this.getParams().id)
    }
  },

  onArticleUpdate(articles) {
    this.setState({
      article: ArticleStore.getArticle(this.getParams().id)
    });
  },

  removeArticle(e) {
    e.preventDefault();
    ArticleActions.removeArticle(this.getParams().id, this);
  },

  changeReadState(e) {
    e.preventDefault();
    ArticleActions.changeReadState(this.getParams().id);
  },

  render() {
    var readState = this.state.article && this.state.article.read ? 'Mark as unread' : 'Mark as read';

    return (
      <div>
        <Header>
          <a href="#" onClick={this.removeArticle}>Remove</a>
          <a href="#" onClick={this.changeReadState}>{readState}</a>
        </Header>

        <div className='main-container'>
          <div className='article'>
            <Article article={this.state.article} />
          </div>
        </div>
      </div>
    );
  }
});

export default ArticleComponent;
