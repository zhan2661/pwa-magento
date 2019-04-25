function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classify from "../../classify";
import { Link } from "@magento/venia-drivers";
import { List } from '@magento/peregrine';
import defaultClasses from "./suggestedCategories.css";

class SuggestedCategories extends Component {
  render() {
    const {
      handleCategorySearch,
      classes,
      autocompleteQuery,
      categorySuggestions
    } = this.props;
    return React.createElement(List, {
      render: "ul",
      className: classes.root,
      items: categorySuggestions,
      getItemKey: item => item.value_string,
      renderItem: ({
        item
      }) => React.createElement("li", {
        className: classes.item
      }, React.createElement(Link, {
        onClick: handleCategorySearch,
        "data-id": item.value_string,
        to: "/search.html"
      }, React.createElement("strong", null, autocompleteQuery), " in ", item.label))
    });
  }

}

_defineProperty(SuggestedCategories, "propTypes", {
  handleCategorySearch: PropTypes.func.isRequired,
  autocompleteQuery: PropTypes.string.isRequired,
  classes: PropTypes.shape({
    root: PropTypes.string,
    item: PropTypes.string
  }),
  categorySuggestions: PropTypes.arrayOf(PropTypes.shape({
    value_string: PropTypes.string,
    label: PropTypes.string
  })).isRequired
});

export default classify(defaultClasses)(SuggestedCategories);
//# sourceMappingURL=suggestedCategories.js.map