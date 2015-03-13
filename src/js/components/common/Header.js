var React = require('react');
var Link = require('react-router').Link;

var Header = React.createClass({
  render() {
    return (
      <header>
        <h1>
          <Link to="app">Read Now</Link>
        </h1>
        {this.props.children}
      </header>
    );
  }
});

module.exports = Header;
