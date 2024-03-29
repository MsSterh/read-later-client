import React from 'react';
import Reflux from 'reflux';
import { debounce } from 'lodash';

import FancyInput from '../FancyInput';
import FilterActions from '../../actions/FilterActions';
import FilterStore from '../../stores/FilterStore';

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

  onChangeHandler(e) {
    this.setState({ search: e.target.value });
    this.handleSearchDebounced();
  },

  render() {
    return (
      <FancyInput className='search' label='Search'>
        <input type='search'
          value={this.state.search}
          onChange={this.onChangeHandler} />
      </FancyInput>
    );
  }
});

export default Search;
