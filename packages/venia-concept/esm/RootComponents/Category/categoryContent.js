import React, { Component } from 'react';
import classify from "../../classify";
import Gallery from "../../components/Gallery";
import Pagination from "../../components/Pagination";
import defaultClasses from "./category.css";

class CategoryContent extends Component {
  render() {
    const {
      classes,
      pageControl,
      data,
      pageSize
    } = this.props;
    const items = data ? data.category.products.items : null;
    const title = data ? data.category.description : null;
    const categoryTitle = data ? data.category.name : null;
    return React.createElement("article", {
      className: classes.root
    }, React.createElement("h1", {
      className: classes.title
    }, React.createElement("div", {
      dangerouslySetInnerHTML: {
        __html: title
      }
    }), React.createElement("div", {
      className: classes.categoryTitle
    }, categoryTitle)), React.createElement("section", {
      className: classes.gallery
    }, React.createElement(Gallery, {
      data: items,
      title: title,
      pageSize: pageSize
    })), React.createElement("div", {
      className: classes.pagination
    }, React.createElement(Pagination, {
      pageControl: pageControl
    })));
  }

}

export default classify(defaultClasses)(CategoryContent);
//# sourceMappingURL=categoryContent.js.map