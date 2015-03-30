jest.dontMock('../AddArticleForm');

import React from 'react/addons';
import AddArticleFormComponent from '../AddArticleForm';

const TestUtils = React.addons.TestUtils;

describe('AddArticleForm', () => {
  var AddArticleForm,
    onSubmitHandler;

  beforeEach(() => {
    onSubmitHandler = jest.genMockFunction();
    AddArticleForm = TestUtils.renderIntoDocument(<AddArticleFormComponent onSubmitHandler={onSubmitHandler} />);
  });

  describe('submit', () => {
    it('calls onSubmitHandler', () => {
      var urlInput = AddArticleForm.refs.url.getDOMNode();
      React.addons.TestUtils.Simulate.change(urlInput, {target: {value: 'clojure'}});
    });

    it('clears input field', () => {
    });
  });
});
