jest.dontMock('../../FancyInput');
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

  describe('keyPress', () => {
    var url, inputField;

    beforeEach(function() {
      var form = TestUtils.findRenderedDOMComponentWithTag(AddArticleForm, 'form');
      inputField = TestUtils.findRenderedDOMComponentWithClass(form, 'add-url');
      url = 'http://example.com/example';

      inputField.getDOMNode().value = url;
      TestUtils.Simulate.keyDown(inputField, { keyCode: 13 });
    });

    it('calls onSubmitHandler', () => {
      expect(onSubmitHandler).toBeCalledWith(url);
    });

    it('clears input field', () => {
      expect(inputField.getDOMNode().value).toEqual('');
    });
  });
});
