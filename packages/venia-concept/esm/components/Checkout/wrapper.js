function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { connect } from "@magento/venia-drivers";
import { array, bool, func, object, oneOf, shape, string } from 'prop-types';
import { beginCheckout, cancelCheckout, editOrder, submitShippingAddress, submitOrder, submitPaymentMethodAndBillingAddress, submitShippingMethod } from "../../actions/checkout";
import Flow from "./flow";

const hasData = value => !!value;

const isCartReady = cart => cart.details.items_count > 0;

const isCheckoutReady = checkout => {
  const {
    billingAddress,
    paymentData,
    shippingAddress,
    shippingMethod
  } = checkout;
  return [billingAddress, paymentData, shippingAddress, shippingMethod].every(hasData);
};

export class CheckoutWrapper extends Component {
  render() {
    const {
      beginCheckout,
      cancelCheckout,
      cart,
      checkout,
      directory,
      editOrder,
      requestOrder,
      submitShippingAddress,
      submitOrder,
      submitPaymentMethodAndBillingAddress,
      submitShippingMethod
    } = this.props; // ensure state slices are present

    if (!(cart && checkout)) {
      return null;
    }

    const actions = {
      beginCheckout,
      cancelCheckout,
      editOrder,
      requestOrder,
      submitShippingAddress,
      submitOrder,
      submitPaymentMethodAndBillingAddress,
      submitShippingMethod
    };
    const {
      availableShippingMethods,
      paymentData,
      shippingAddress,
      shippingMethod
    } = checkout;
    const miscProps = {
      availableShippingMethods,
      hasPaymentMethod: hasData(paymentData),
      hasShippingAddress: hasData(shippingAddress),
      hasShippingMethod: hasData(shippingMethod),
      isCartReady: isCartReady(cart),
      isCheckoutReady: isCheckoutReady(checkout)
    };

    const flowProps = _objectSpread({
      actions,
      cart,
      checkout,
      directory
    }, miscProps);

    return React.createElement(Flow, flowProps);
  }

}

_defineProperty(CheckoutWrapper, "propTypes", {
  beginCheckout: func,
  cancelCheckout: func,
  cart: shape({
    details: object.isRequired,
    guestCartId: string,
    totals: object
  }).isRequired,
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
    submitting: bool.isRequired
  }),
  directory: shape({
    countries: array
  }),
  editOrder: func,
  submitShippingAddress: func,
  submitOrder: func,
  submitPaymentMethodAndBillingAddress: func,
  submitShippingMethod: func
});

const mapStateToProps = ({
  cart,
  checkout,
  directory
}) => ({
  cart,
  checkout,
  directory
});

const mapDispatchToProps = {
  beginCheckout,
  cancelCheckout,
  editOrder,
  submitShippingAddress,
  submitOrder,
  submitPaymentMethodAndBillingAddress,
  submitShippingMethod
};
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutWrapper);
//# sourceMappingURL=wrapper.js.map