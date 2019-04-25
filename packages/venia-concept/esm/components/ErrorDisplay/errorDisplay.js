function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { shape, string } from 'prop-types';
import classify from "../../classify";
import defaultClasses from "./errorDisplay.css";

class ErrorDisplay extends Component {
  render() {
    const {
      classes,
      error
    } = this.props;
    const message = error && error.message;

    if (!message) {
      return null;
    }

    return React.createElement("pre", {
      className: classes.root
    }, React.createElement("code", {
      className: classes.body
    }, message));
  }

}

_defineProperty(ErrorDisplay, "propTypes", {
  classes: shape({
    body: string,
    root: string
  }),
  error: shape({
    message: string
  })
});

export default classify(defaultClasses)(ErrorDisplay);
//# sourceMappingURL=errorDisplay.js.map