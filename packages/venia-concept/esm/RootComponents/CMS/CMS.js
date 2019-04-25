import React, { Component } from 'react';
import CategoryList from "../../components/CategoryList";
import Home from "../../components/Home";
export default class CMS extends Component {
  render() {
    return React.createElement("div", null, React.createElement(CategoryList, {
      title: "Shop by category",
      id: 2
    }), React.createElement(Home, null));
  }

}
//# sourceMappingURL=CMS.js.map