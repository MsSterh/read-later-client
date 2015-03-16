var React = require('react');
var Reflux = require('reflux');
var Link = require('react-router').Link;

var AddArticleForm = require('../AddArticleForm');
var Filter = require('../Filter');
var FilterStore = require('../../../stores/FilterStore');

var Header = React.createClass({
  mixins: [Reflux.connect(FilterStore, 'filter')],
  render() {
    return (
      <header>
        <AddArticleForm />
        <Filter showAll={this.state.showAll} />
        <h1>
          <Link to="app">Read Now</Link>
        </h1>
        {this.props.children}
      </header>
    );
  }
});

module.exports = Header;
