jest.dontMock('../FilterStore');
jest.dontMock('../../actions/FilterActions');

import FilterStore from '../FilterStore';
import FilterActions from '../../actions/FilterActions';

describe('FilterStore', () => {
  it('initializes with empty filter values', function() {
    expect(FilterStore.getFilters()).toEqual({
      unreadOnly: true,
      search: ''
    });
  });

  describe('search', () => {
    it('changes search filter', () => {
      FilterActions.search('clojure');
      jest.runOnlyPendingTimers();
      expect(FilterStore.getFilters().search).toEqual('clojure');
    });
  });

  describe('switchDisplayFilter', () => {
    it('changes display filter from false to true', () => {
      FilterStore._filters.unreadOnly = false;
      FilterActions.switchDisplayFilter();
      jest.runOnlyPendingTimers();
      expect(FilterStore.getFilters().unreadOnly).toEqual(true);
    });

    it('changes display filter from true to false', () => {
      FilterStore._filters.unreadOnly = true;
      FilterActions.switchDisplayFilter();
      jest.runOnlyPendingTimers();
      expect(FilterStore.getFilters().unreadOnly).toEqual(false);
    });
  });
});
