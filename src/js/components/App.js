var React = require('react');
var Router = require('react-router');
var Notification = require('./Notification');

var RouteHandler = Router.RouteHandler;

var App = React.createClass({
  render() {
    return (
      <div>
        <Notification />
        <RouteHandler />
      </div>
    );
  }
});

module.exports = App;
