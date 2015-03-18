var React = require('react');
var Router = require('react-router');
var Notification = require('./Notification');
var Footer = require('./Footer/Index');

var RouteHandler = Router.RouteHandler;

var App = React.createClass({
  render() {
    return (
      <div>
        <Notification />
        <RouteHandler />
        <Footer />
      </div>
    );
  }
});

module.exports = App;
