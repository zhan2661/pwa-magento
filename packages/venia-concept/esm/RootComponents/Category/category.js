function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { string, number, shape } from 'prop-types';
import { compose } from 'redux';
import { connect, Query } from "@magento/venia-drivers";
import classify from "../../classify";
import { setCurrentPage, setPrevPageTotal } from "../../actions/catalog";
import { loadingIndicator } from "../../components/LoadingIndicator";
import CategoryContent from "./categoryContent";
import defaultClasses from "./category.css";
import categoryQuery from "../../queries/getCategory.graphql";

class Category extends Component {
  // TODO: Should not be a default here, we just don't have
  // the wiring in place to map route info down the tree (yet)
  componentDidUpdate(prevProps) {
    // If the current page has changed, scroll back up to the top.
    if (this.props.currentPage !== prevProps.currentPage) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const {
      id,
      classes,
      currentPage,
      pageSize,
      prevPageTotal,
      setCurrentPage,
      setPrevPageTotal
    } = this.props;
    const pageControl = {
      currentPage: currentPage,
      setPage: setCurrentPage,
      updateTotalPages: setPrevPageTotal,
      totalPages: prevPageTotal
    };
    return React.createElement(Query, {
      query: categoryQuery,
      variables: {
        id: Number(id),
        onServer: false,
        pageSize: Number(pageSize),
        currentPage: Number(currentPage)
      }
    }, ({
      loading,
      error,
      data
    }) => {
      if (error) return React.createElement("div", null, "Data Fetch Error"); // If our pagination component has mounted, then we have
      // a total page count in the store, so we continue to render
      // with our last known total

      if (loading) return pageControl.totalPages ? React.createElement(CategoryContent, {
        pageControl: pageControl,
        pageSize: pageSize
      }) : loadingIndicator; // TODO: Retrieve the page total from GraphQL when ready

      const pageCount = data.category.products.total_count / pageSize;
      const totalPages = Math.ceil(pageCount);

      const totalWrapper = _objectSpread({}, pageControl, {
        totalPages: totalPages
      });

      return React.createElement(CategoryContent, {
        classes: classes,
        pageControl: totalWrapper,
        data: data
      });
    });
  }

}

_defineProperty(Category, "propTypes", {
  id: number,
  classes: shape({
    gallery: string,
    root: string,
    title: string
  }),
  currentPage: number,
  pageSize: number,
  prevPageTotal: number
});

_defineProperty(Category, "defaultProps", {
  id: 3
});

const mapStateToProps = ({
  catalog
}) => {
  return {
    currentPage: catalog.currentPage,
    pageSize: catalog.pageSize,
    prevPageTotal: catalog.prevPageTotal
  };
};

const mapDispatchToProps = {
  setCurrentPage,
  setPrevPageTotal
};
export default compose(classify(defaultClasses), connect(mapStateToProps, mapDispatchToProps))(Category);
//# sourceMappingURL=category.js.map