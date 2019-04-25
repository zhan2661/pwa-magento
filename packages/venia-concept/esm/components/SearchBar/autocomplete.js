function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import { Query } from "@magento/venia-drivers";
import classify from "../../classify";
import { loadingIndicator } from "../LoadingIndicator";
import SuggestedCategories from "./suggestedCategories";
import SuggestedProducts from "./suggestedProducts";
import PRODUCT_SEARCH from "../../queries/productSearch.graphql";
import defaultClasses from "./autocomplete.css";
const debounceTimeout = 200;
const suggestedCategoriesLimit = 4;
const suggestedProductsLimit = 3;

class SearchAutocomplete extends Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "componentDidUpdate", prevProps => {
      const {
        searchQuery
      } = this.props;

      if (prevProps.searchQuery !== searchQuery) {
        this.setState({
          isQueryUpdating: true
        });
        this.updateAutocompleteQuery(searchQuery);
      }
    });

    _defineProperty(this, "updateAutocompleteQuery", debounce(value => {
      this.setState({
        autocompleteQuery: value,
        isQueryUpdating: false
      });
    }, debounceTimeout));

    _defineProperty(this, "handleCategorySearch", event => {
      event.preventDefault();
      const {
        id
      } = event.currentTarget.dataset || event.srcElement.dataset;
      this.props.updateAutocompleteVisible(false);
      this.props.executeSearch(this.state.autocompleteQuery, this.props.history, id);
    });

    _defineProperty(this, "handleOnProductOpen", () => this.props.updateAutocompleteVisible(false));

    this.state = {
      isQueryUpdating: false,
      autocompleteQuery: props.searchQuery || ''
    };
  }

  // map Magento 2.3.1 schema changes to Venia 2.0.0 proptype shape to maintain backwards compatibility
  mapProducts(products) {
    return products.map(product => {
      const {
        small_image
      } = product;
      return _objectSpread({}, product, {
        small_image: typeof small_image === 'object' ? small_image.url : small_image
      });
    });
  }

  render() {
    const {
      classes,
      autocompleteVisible
    } = this.props;
    const {
      handleOnProductOpen,
      handleCategorySearch
    } = this;
    const {
      autocompleteQuery,
      isQueryUpdating
    } = this.state;
    if (!autocompleteVisible || autocompleteQuery.length < 3) return null;
    return React.createElement(Query, {
      query: PRODUCT_SEARCH,
      variables: {
        inputText: autocompleteQuery
      }
    }, ({
      loading,
      error,
      data
    }) => {
      if (error) return React.createElement("div", {
        className: classes.root
      }, React.createElement("div", {
        className: classes.statusContent
      }, "Data Fetch Error"));
      if (loading || isQueryUpdating) return React.createElement("div", {
        className: classes.root
      }, React.createElement("div", {
        className: classes.statusContent
      }, loadingIndicator));
      const {
        filters,
        items
      } = data.products;
      if (items.length <= 0) return React.createElement("div", {
        className: classes.root
      }, React.createElement("div", {
        className: classes.statusContent
      }, "No results found, try a different search"));
      const categoryFilter = filters.find(filter => filter.name === 'Category');
      const categorySuggestions = categoryFilter['filter_items'].slice(0, suggestedCategoriesLimit);
      return React.createElement("div", {
        className: classes.root
      }, React.createElement(SuggestedCategories, {
        handleCategorySearch: handleCategorySearch,
        autocompleteQuery: autocompleteQuery,
        categorySuggestions: categorySuggestions
      }), React.createElement(SuggestedProducts, {
        handleOnProductOpen: handleOnProductOpen,
        items: this.mapProducts(items.slice(0, suggestedProductsLimit))
      }));
    });
  }

}

_defineProperty(SearchAutocomplete, "propTypes", {
  classes: PropTypes.shape({
    root: PropTypes.string,
    statusContent: PropTypes.string
  }),
  searchQuery: PropTypes.string.isRequired,
  autocompleteVisible: PropTypes.bool,
  executeSearch: PropTypes.func.isRequired,
  updateAutocompleteVisible: PropTypes.func.isRequired
});

export default classify(defaultClasses)(SearchAutocomplete);
//# sourceMappingURL=autocomplete.js.map