function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'informed';
import Input from "../../Input";
import Button from "../../Button";
import classify from "../../../classify";
import defaultClasses from "./forgotPasswordForm.css";

class ForgotPasswordForm extends Component {
  // There is an issue with handling initial values in Input.
  // TODO: Pass initial value to email input after fixing this bug.
  render() {
    const {
      classes,
      onSubmit
    } = this.props;
    return React.createElement(Form, {
      className: classes.form,
      onSubmit: onSubmit
    }, React.createElement(Input, {
      label: "Email Address",
      autoComplete: "email",
      field: "email",
      required: true,
      selected: true
    }), React.createElement("div", {
      className: classes.buttonContainer
    }, React.createElement(Button, {
      type: "submit",
      priority: "high"
    }, "Submit")));
  }

}

_defineProperty(ForgotPasswordForm, "propTypes", {
  classes: PropTypes.shape({
    form: PropTypes.string,
    buttonContainer: PropTypes.string
  }),
  initialValues: PropTypes.shape({
    email: PropTypes.string
  }),
  onSubmit: PropTypes.func.isRequired
});

_defineProperty(ForgotPasswordForm, "defaultProps", {
  initialValues: {}
});

export default classify(defaultClasses)(ForgotPasswordForm);
//# sourceMappingURL=forgotPasswordForm.js.map