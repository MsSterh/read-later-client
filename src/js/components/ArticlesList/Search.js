var React = require('react');
var Reflux = require('reflux');
var debounce = require('lodash').debounce;

var FilterActions = require('../../actions/FilterActions');
var FilterStore = require('../../stores/FilterStore');

var Search = React.createClass({
  mixins: [Reflux.connect(FilterStore)],

  getInitialState() {
    return FilterStore.getFilters();
  },

  componentWillMount() {
    this.handleSearchDebounced = debounce(() => {
      FilterActions.search(this.state.search);
    }, 500);
  },

  onChangeHandler() {
    this.setState({ search: this.refs.search.getDOMNode().value });
    this.handleSearchDebounced();
  },

  render() {
    return (
      <div className='search'>
        <input type='search' placeholder='Search' value={this.state.search} ref='search' onChange={this.onChangeHandler} />
      </div>
    );
  }
});

module.exports = Search;
