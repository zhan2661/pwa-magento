function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { func, shape, string } from 'prop-types';
import { Form } from 'informed';
import classify from "../../classify";
import Button from "../Button";
import ErrorDisplay from "../ErrorDisplay";
import Field from "../Field";
import TextInput from "../TextInput";
import { asyncValidators, validators } from "./validators";
import defaultClasses from "./createAccount.css";

class CreateAccount extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "handleSubmit", values => {
      const {
        onSubmit
      } = this.props;

      if (typeof onSubmit === 'function') {
        onSubmit(values);
      }
    });
  }

  get initialValues() {
    const {
      initialValues
    } = this.props;

    const {
      email,
      firstName,
      lastName
    } = initialValues,
          rest = _objectWithoutProperties(initialValues, ["email", "firstName", "lastName"]);

    return _objectSpread({
      customer: {
        email,
        firstname: firstName,
        lastname: lastName
      }
    }, rest);
  }

  render() {
    const {
      handleSubmit,
      initialValues,
      props
    } = this;
    const {
      classes,
      createAccountError
    } = props;
    return React.createElement(Form, {
      className: classes.root,
      initialValues: initialValues,
      onSubmit: handleSubmit
    }, React.createElement("h3", {
      className: classes.lead
    }, 'An account gives you access to rewards!'), React.createElement(Field, {
      label: "Email"
    }, React.createElement(TextInput, {
      field: "customer.email",
      autoComplete: "email",
      validate: validators.get('email'),
      asyncValidate: asyncValidators.get('email'),
      validateOnBlur: true,
      asyncValidateOnBlur: true
    })), React.createElement(Field, {
      label: "First Name"
    }, React.createElement(TextInput, {
      field: "customer.firstname",
      autoComplete: "given-name",
      validate: validators.get('firstName'),
      validateOnBlur: true
    })), React.createElement(Field, {
      label: "Last Name"
    }, React.createElement(TextInput, {
      field: "customer.lastname",
      autoComplete: "family-name",
      validate: validators.get('lastName'),
      validateOnBlur: true
    })), React.createElement(Field, {
      label: "Password"
    }, React.createElement(TextInput, {
      field: "password",
      type: "password",
      autoComplete: "new-password",
      validate: validators.get('password'),
      validateOnBlur: true
    })), React.createElement(Field, {
      label: "Confirm Password"
    }, React.createElement(TextInput, {
      field: "confirm",
      type: "password",
      validate: validators.get('confirm'),
      validateOnBlur: true
    })), React.createElement(ErrorDisplay, {
      error: createAccountError
    }), React.createElement("div", {
      className: classes.actions
    }, React.createElement(Button, {
      type: "submit",
      priority: "high"
    }, 'Submit')));
  }

}

_defineProperty(CreateAccount, "propTypes", {
  classes: shape({
    error: string,
    root: string
  }),
  createAccountError: shape({
    message: string
  }),
  initialValues: shape({
    email: string,
    firstName: string,
    lastName: string
  }),
  onSubmit: func
});

_defineProperty(CreateAccount, "defaultProps", {
  initialValues: {}
});

export default classify(defaultClasses)(CreateAccount);
//# sourceMappingURL=createAccount.js.map