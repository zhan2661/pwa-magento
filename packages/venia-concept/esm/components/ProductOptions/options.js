function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { arrayOf, func, shape, string } from 'prop-types';
import Option from "./option";

class Options extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "handleSelectionChange", (optionId, selection) => {
      const {
        onSelectionChange
      } = this.props;

      if (onSelectionChange) {
        onSelectionChange(optionId, selection);
      }
    });
  }

  render() {
    const {
      handleSelectionChange,
      props
    } = this;
    const {
      options
    } = props;
    return options.map(option => React.createElement(Option, _extends({}, option, {
      key: option.attribute_id,
      onSelectionChange: handleSelectionChange
    })));
  }

}

_defineProperty(Options, "propTypes", {
  onSelectionChange: func,
  options: arrayOf(shape({
    attribute_id: string.isRequired
  })).isRequired
});

export default Options;
//# sourceMappingURL=options.js.map