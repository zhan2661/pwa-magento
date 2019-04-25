function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { func, shape, string } from 'prop-types';
import classify from "../../../classify";
import Button from "../../Button";
import defaultClasses from "./receipt.css";
export const CONTINUE_SHOPPING_BUTTON_ID = 'continue-shopping-button';
export const CREATE_ACCOUNT_BUTTON_ID = 'create-account-button';

class Receipt extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "createAccount", () => {
      this.props.createAccount(this.props.history);
    });

    _defineProperty(this, "continueShopping", () => {
      this.props.continueShopping(this.props.history);
    });
  }

  componentWillUnmount() {
    this.props.reset();
  }

  render() {
    const {
      classes,
      order: {
        id
      }
    } = this.props;
    return React.createElement("div", {
      className: classes.root
    }, React.createElement("div", {
      className: classes.body
    }, React.createElement("h2", {
      className: classes.header
    }, "Thank you for your purchase!"), React.createElement("div", {
      className: classes.textBlock
    }, "Your order # is", ' ', React.createElement("span", {
      className: classes.orderId
    }, id), React.createElement("br", null), "We\u2019ll email you an order confirmation with details and tracking info"), React.createElement(Button, {
      "data-id": CONTINUE_SHOPPING_BUTTON_ID,
      onClick: this.continueShopping
    }, "Continue Shopping"), React.createElement("div", {
      className: classes.textBlock
    }, "Track order status and earn rewards for your purchase by creating and account."), React.createElement(Button, {
      "data-id": CREATE_ACCOUNT_BUTTON_ID,
      priority: "high",
      onClick: this.createAccount
    }, "Create an Account")));
  }

}

_defineProperty(Receipt, "propTypes", {
  classes: shape({
    body: string,
    footer: string,
    root: string
  }),
  continueShopping: func.isRequired,
  order: shape({
    id: string
  }).isRequired,
  createAccount: func.isRequired,
  reset: func.isRequired
});

_defineProperty(Receipt, "defaultProps", {
  order: {},
  continueShopping: () => {},
  reset: () => {},
  createAccount: () => {}
});

export default classify(defaultClasses)(Receipt);
//# sourceMappingURL=receipt.js.map