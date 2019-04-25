function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from '@magento/peregrine';
import SuggestedProduct from "./suggestedProduct";
import classify from "../../classify";
import defaultClasses from "./suggestedProducts.css";

class SuggestedProducts extends Component {
  render() {
    const {
      classes,
      items,
      handleOnProductOpen
    } = this.props;
    return React.createElement("div", {
      className: classes.root
    }, React.createElement("h4", {
      className: classes.title
    }, React.createElement("span", {
      className: classes.titleText
    }, "Product Suggestions")), React.createElement(List, {
      render: "ul",
      className: classes.items,
      items: items,
      getItemKey: item => item.id,
      renderItem: props => React.createElement(SuggestedProduct, _extends({
        handleOnProductOpen: handleOnProductOpen
      }, props.item))
    }));
  }

}

_defineProperty(SuggestedProducts, "propTypes", {
  classes: PropTypes.shape({
    items: PropTypes.string,
    title: PropTypes.string,
    titleText: PropTypes.string
  }),
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleOnProductOpen: PropTypes.func.isRequired
});

export default classify(defaultClasses)(SuggestedProducts);
//# sourceMappingURL=suggestedProducts.js.map