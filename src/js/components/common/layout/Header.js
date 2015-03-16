var React = require('react');
var Link = require('react-router').Link;

var AddArticleForm = require('../AddArticleForm');

var Header = React.createClass({
  render() {
    return (
      <header>
        <AddArticleForm />
        <h1>
          <Link to="app">Read Now</Link>
        </h1>
        {this.props.children}
      </header>
    );
  }
});

module.exports = Header;
