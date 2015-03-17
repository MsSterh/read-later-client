require('highlight.js/styles/railscasts.css');
require('../styles/main.css');
require('../styles/normalize.min.css');

var React = require('react');
var Router = require('react-router');

var App = require('./components/App');
var ArticlesList = require('./components/ArticlesList/Index');
var Article = require('./components/Article/Index');

var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var routes = (
  <Route name="app" path="/" handler={App} >
    <DefaultRoute handler={ArticlesList} />
    <Route name="articles" path="articles" handler={ArticlesList} />
    <Route name="article" path="articles/:id" handler={Article} />
  </Route>
);

Router.run(routes, Router.HistoryLocation, Handler => {
  React.render(<Handler />, document.getElementById('app'));
});
