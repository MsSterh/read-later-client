import React from 'react';
import Router from 'react-router';
import Notification from './Notification';
import Footer from './Footer/Index';

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

export default App;
