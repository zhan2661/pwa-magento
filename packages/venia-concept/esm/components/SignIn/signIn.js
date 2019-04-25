function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from "../Input";
import Button from "../Button";
import defaultClasses from "./signIn.css";
import classify from "../../classify";
import { Form } from 'informed';
import ErrorDisplay from "../ErrorDisplay";

class SignIn extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      password: '',
      username: ''
    });

    _defineProperty(this, "onSignIn", () => {
      const {
        username,
        password
      } = this.state;
      this.props.signIn({
        username: username,
        password: password
      });
    });

    _defineProperty(this, "showCreateAccountForm", () => {
      this.props.setDefaultUsername(this.state.username);
      this.props.showCreateAccountForm();
    });

    _defineProperty(this, "handleForgotPassword", () => {
      this.props.setDefaultUsername(this.state.username);
      this.props.onForgotPassword();
    });

    _defineProperty(this, "updatePassword", newPassword => {
      this.setState({
        password: newPassword
      });
    });

    _defineProperty(this, "updateUsername", newUsername => {
      this.setState({
        username: newUsername
      });
    });
  }

  get errorMessage() {
    const {
      signInError
    } = this.props;
    return React.createElement(ErrorDisplay, {
      error: signInError
    });
  }

  render() {
    const {
      classes
    } = this.props;
    const {
      onSignIn,
      errorMessage
    } = this;
    return React.createElement("div", {
      className: classes.root
    }, React.createElement(Form, {
      onSubmit: onSignIn
    }, React.createElement(Input, {
      onChange: this.updateUsername,
      helpText: 'example help text',
      label: 'Username or Email',
      required: true,
      autoComplete: 'username',
      field: "username"
    }), React.createElement(Input, {
      onChange: this.updatePassword,
      label: 'Password',
      type: 'password',
      helpText: 'example help text',
      required: true,
      autoComplete: 'current-password',
      field: "password"
    }), React.createElement("div", {
      className: classes.signInButton
    }, React.createElement(Button, {
      priority: "high",
      type: "submit"
    }, "Sign In")), React.createElement("div", {
      className: classes.signInError
    }, errorMessage), React.createElement("button", {
      type: "button",
      className: classes.forgotPassword,
      onClick: this.handleForgotPassword
    }, "Forgot password?")), React.createElement("div", {
      className: classes.signInDivider
    }), React.createElement("div", {
      className: classes.showCreateAccountButton
    }, React.createElement(Button, {
      onClick: this.showCreateAccountForm
    }, ' ', "Create an Account", ' ')));
  }

}

_defineProperty(SignIn, "propTypes", {
  classes: PropTypes.shape({
    signInSection: PropTypes.string,
    signInDivider: PropTypes.string,
    forgotPassword: PropTypes.string,
    root: PropTypes.string,
    signInError: PropTypes.string,
    showCreateAccountButton: PropTypes.string
  }),
  signInError: PropTypes.object,
  signIn: PropTypes.func,
  onForgotPassword: PropTypes.func.isRequired
});

export default classify(defaultClasses)(SignIn);
//# sourceMappingURL=signIn.js.map