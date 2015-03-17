var React = require('react');
var Reflux = require('reflux');

var FilterStore = require('../../stores/FilterStore');
var FilterActions = require('../../actions/FilterActions');

var UnreadFilter = React.createClass({
  mixins: [Reflux.connect(FilterStore)],

  getInitialState() {
    return FilterStore.getFilters();
  },

  switchDisplayFilter(e) {
    e.preventDefault();
    FilterActions.switchDisplayFilter(this.state.unreadOnly);
  },

  render() {
    var content = this.state.unreadOnly ? 'Show All' : 'Show "unread" only';

    return (
      <div className='show_archive'>
        <a href="#" onClick={this.switchDisplayFilter}>{content}</a>
      </div>
    );
  }
});

module.exports = UnreadFilter;
