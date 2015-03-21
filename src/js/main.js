import 'highlight.js/styles/railscasts.css';
import '../styles/main.css';
import '../styles/normalize.min.css';

import React from 'react';
import { run, HistoryLocation, Route, DefaultRoute } from 'react-router';

import App from './components/App';
import ArticlesList from './components/ArticlesList/Index';
import Article from './components/Article/Index';

var routes = (
  <Route name="app" path="/" handler={App} >
    <DefaultRoute handler={ArticlesList} />
    <Route name="articles" path="articles" handler={ArticlesList} />
    <Route name="article" path="articles/:id" handler={Article} />
  </Route>
);

run(routes, HistoryLocation, Handler => {
  React.render(<Handler />, document.getElementById('app'));
});

window.React = React;
