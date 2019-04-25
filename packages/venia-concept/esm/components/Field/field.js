function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { node, shape, string } from 'prop-types';
import classify from "../../classify";
import defaultClasses from "./field.css";

class Field extends Component {
  render() {
    const {
      children,
      classes,
      label
    } = this.props;
    return React.createElement("div", {
      className: classes.root
    }, React.createElement("span", {
      className: classes.label
    }, label), children);
  }

}

_defineProperty(Field, "propTypes", {
  children: node,
  classes: shape({
    label: string,
    root: string
  }),
  label: node
});

export default classify(defaultClasses)(Field);
//# sourceMappingURL=field.js.map