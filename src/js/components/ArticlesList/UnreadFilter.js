import React from 'react';
import Reflux from 'reflux';

import FilterStore from '../../stores/FilterStore';
import FilterActions from '../../actions/FilterActions';

var UnreadFilter = React.createClass({
  mixins: [Reflux.connect(FilterStore)],

  getInitialState() {
    return FilterStore.getFilters();
  },

  switchDisplayFilter(e) {
    e.preventDefault();
    FilterActions.switchDisplayFilter();
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

export default UnreadFilter;
