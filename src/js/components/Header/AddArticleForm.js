import React from 'react';
import FancyInput from '../FancyInput';

const ENTER_KEY_CODE = 13;

var AddArticleForm = React.createClass({
  keyDownHandler(e) {
    if (e.keyCode === ENTER_KEY_CODE) {
      e.preventDefault();
      var el = e.target;
      var value = el.value.trim();
      el.value = '';
      this.props.onSubmitHandler(value);
    }
  },

  render() {
    return (
      <div className='add_url'>
        <form>
          <FancyInput label='http://...'>
            <input className='add-url' onKeyDown={this.keyDownHandler} type='text' />
          </FancyInput>
        </form>
      </div>
    );
  }
});

export default AddArticleForm;
