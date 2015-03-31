jest.dontMock('../AddArticleForm');

import React from 'react/addons';
import AddArticleFormComponent from '../AddArticleForm';

const TestUtils = React.addons.TestUtils;

describe('AddArticleForm', () => {
  var AddArticleForm, onSubmitHandler;

  beforeEach(() => {
    onSubmitHandler = jest.genMockFunction();
    AddArticleForm = TestUtils.renderIntoDocument(<AddArticleFormComponent onSubmitHandler={onSubmitHandler} />);
  });

  describe('submit', () => {
    beforeEach(function() {
      var form = TestUtils.findRenderedDOMComponentWithTag(AddArticleForm, 'form');

      AddArticleForm.refs.url.getDOMNode().value = 'clojure';
      TestUtils.Simulate.submit(form);
    });

    it('calls onSubmitHandler', () => {
      expect(onSubmitHandler).toBeCalledWith('clojure');
    });

    it('clears input field', () => {
      expect(AddArticleForm.refs.url.getDOMNode().value).toEqual('');
    });
  });
});
