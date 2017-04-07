'use strict';

import React, {
  Component,
  PropTypes
}               from 'react';

class SearchForm extends Component {
  static propTypes = {
    onSearchSubmit: PropTypes.func.isRequired,
    placeholder:    PropTypes.string,
    defaultValue:    PropTypes.string
  };

  static defaultProps = {
    placeholder:  'Mot(s)-clé(s)',
    defaultValue: ''
  };

  componentDidMount() {
    this.searchinput.focus();
    this.setDefaultSearchValueIfNeeded();
  }

  render() {
    const { placeholder } = this.props;
    return (
      <form
        className="form-inline"
        onKeyPress={this.handlesFormKeyPress}>
        <div className="input-group">
          <input
            ref={(ref) => (this.searchinput = ref)}
            type="text"
            name="searchinput"
            className="form-control"
            placeholder={placeholder}
          />
          <span className="input-group-btn">
            <button
              onClick={this.handlesButtonPress}
              name="search"
              id="search-btn"
              className="btn btn-default">
              <i className="fa fa-search" />
            </button>
          </span>
        </div>
      </form>
    );
  }

  setDefaultSearchValueIfNeeded = () => {
    const { defaultValue } = this.props;
    if (defaultValue.length > 0) {
      this.searchinput.value = defaultValue;
    }
  }

  handlesButtonPress = (event) => {
    event.preventDefault();
    this.props.onSearchSubmit(this.searchinput.value.trim());
  }

  handlesFormKeyPress = (event) => {
    if (event.charCode === 13) {
      event.preventDefault();
      this.props.onSearchSubmit(this.searchinput.value.trim());
    }
  }
}

export default SearchForm;
