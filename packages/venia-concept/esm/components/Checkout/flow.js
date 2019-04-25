function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { array, bool, func, object, oneOf, shape, string } from 'prop-types';
import classify from "../../classify";
import Cart from "./cart";
import Form from "./form";
import Receipt from "./Receipt";
import defaultClasses from "./flow.css";

class Flow extends Component {
  get child() {
    const {
      actions,
      cart,
      checkout,
      hasPaymentMethod,
      hasShippingAddress,
      hasShippingMethod,
      directory,
      isCartReady,
      isCheckoutReady
    } = this.props;
    const {
      beginCheckout,
      cancelCheckout,
      editOrder,
      submitShippingAddress,
      submitOrder,
      submitPaymentMethodAndBillingAddress,
      submitShippingMethod
    } = actions;
    const {
      availableShippingMethods,
      billingAddress,
      editing,
      isAddressIncorrect,
      incorrectAddressMessage,
      paymentData,
      shippingAddress,
      shippingMethod,
      shippingTitle,
      step,
      submitting
    } = checkout;

    switch (step) {
      case 'cart':
        {
          const stepProps = {
            beginCheckout,
            ready: isCartReady,
            submitting
          };
          return React.createElement(Cart, stepProps);
        }

      case 'form':
        {
          const stepProps = {
            availableShippingMethods,
            billingAddress,
            cancelCheckout,
            cart,
            directory,
            editOrder,
            editing,
            hasPaymentMethod,
            hasShippingAddress,
            hasShippingMethod,
            incorrectAddressMessage,
            isAddressIncorrect,
            paymentData,
            ready: isCheckoutReady,
            shippingAddress,
            shippingMethod,
            shippingTitle,
            submitShippingAddress,
            submitOrder,
            submitPaymentMethodAndBillingAddress,
            submitShippingMethod,
            submitting
          };
          return React.createElement(Form, stepProps);
        }

      case 'receipt':
        {
          return React.createElement(Receipt, null);
        }

      default:
        {
          return null;
        }
    }
  }

  render() {
    const {
      child,
      props
    } = this;
    const {
      classes
    } = props;
    return React.createElement("div", {
      className: classes.root
    }, child);
  }

}

_defineProperty(Flow, "propTypes", {
  actions: shape({
    beginCheckout: func,
    cancelCheckout: func,
    editOrder: func,
    submitShippingAddress: func,
    submitOrder: func,
    submitPaymentMethodAndBillingAddress: func,
    submitShippingMethod: func
  }).isRequired,
  cart: shape({
    details: object,
    guestCartId: string,
    totals: object
  }),
  checkout: shape({
    availableShippingMethods: array,
    billingAddress: shape({
      city: string,
      country_id: string,
      email: string,
      firstname: string,
      lastname: string,
      postcode: string,
      region_id: string,
      region_code: string,
      region: string,
      street: array,
      telephone: string
    }),
    editing: oneOf(['address', 'paymentMethod', 'shippingMethod']),
    incorrectAddressMessage: string,
    isAddressIncorrect: bool,
    paymentCode: string,
    paymentData: shape({
      description: string,
      details: shape({
        cardType: string
      }),
      nonce: string
    }),
    shippingAddress: shape({
      city: string,
      country_id: string,
      email: string,
      firstname: string,
      lastname: string,
      postcode: string,
      region_id: string,
      region_code: string,
      region: string,
      street: array,
      telephone: string
    }),
    shippingMethod: string,
    shippingTitle: string,
    step: oneOf(['cart', 'form', 'receipt']).isRequired,
    submitting: bool
  }).isRequired,
  directory: shape({
    countries: array
  }),
  classes: shape({
    root: string
  }),
  hasPaymentMethod: bool,
  hasShippingAddress: bool,
  hasShippingMethod: bool,
  isCartReady: bool,
  isCheckoutReady: bool,
  paymentData: shape({
    description: string,
    details: shape({
      cardType: string
    }),
    nonce: string
  }),
  shippingMethod: string,
  shippingTitle: string
});

export default classify(defaultClasses)(Flow);
//# sourceMappingURL=flow.js.map