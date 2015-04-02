jest.dontMock('../FilterStore');
jest.dontMock('../../actions/FilterActions');

import { invokeSync } from '../../utils/test';
import FilterStore from '../FilterStore';
import FilterActions from '../../actions/FilterActions';

describe('FilterStore', () => {
  it('is initialized with empty filter values', function() {
    expect(FilterStore.getFilters()).toEqual({
      unreadOnly: true,
      search: ''
    });
  });

  describe('search', () => {
    it('changes search filter', () => {
      invokeSync(() => FilterActions.search('clojure'));
      expect(FilterStore.getFilters().search).toEqual('clojure');
    });

    it('triggers with changes', () => {
      var listener = jest.genMockFunction();
      FilterStore.listen(listener);
      invokeSync(() => FilterActions.search('clojure'));

      expect(listener.mock.calls[0][0].search).toEqual('clojure');
    });
  });

  describe('switchDisplayFilter', () => {
    it('changes display filter from false to true', () => {
      FilterStore._filters.unreadOnly = false;
      invokeSync(() => FilterActions.switchDisplayFilter());
      expect(FilterStore.getFilters().unreadOnly).toEqual(true);
    });

    it('changes display filter from true to false', () => {
      FilterStore._filters.unreadOnly = true;
      invokeSync(() => FilterActions.switchDisplayFilter());
      expect(FilterStore.getFilters().unreadOnly).toEqual(false);
    });

    it('triggers with changes', () => {
      var listener = jest.genMockFunction();
      FilterStore._filters.unreadOnly = true;
      FilterStore.listen(listener);

      invokeSync(() => FilterActions.switchDisplayFilter());

      expect(listener.mock.calls[0][0].unreadOnly).toEqual(false);
    });
  });
});
