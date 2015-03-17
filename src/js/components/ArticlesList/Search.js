var React = require('react');
var _ = require('lodash');

var FilterActions = require('../../actions/FilterActions');

var Search = React.createClass({
  getInitialState() {
    return { query: '' };
  },

  componentWillMount() {
    this.handleSearchDebounced = _.debounce(() => {
      FilterActions.search(this.state.query);
    }, 500);
  },

  onChangeHandler() {
    this.setState({ query: this.refs.search.getDOMNode().value });
    this.handleSearchDebounced();
  },

  render() {
    return (
      <div>
        <input type="search" value={this.state.query} ref="search" onChange={this.onChangeHandler} />
      </div>
    );
  }
});

module.exports = Search;
