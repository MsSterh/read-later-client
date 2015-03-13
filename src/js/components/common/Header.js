var React = require('react');

var Header = React.createClass({
  render() {
    return (
      <header>
        <h1>Read Now</h1>
        {this.props.children}
      </header>
    );
  }
});

module.exports = Header;
