function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @fileoverview This component uses the BrainTree Web Drop In to
 * hook into Web Payments and the Payment Request API to
 * submit payments via BrainTree.
 *
 * See:
 * https://github.com/braintree/braintree-web-drop-in
 * https://braintree.github.io/braintree-web-drop-in/docs/current/index.html
 * https://developers.braintreepayments.com/guides/drop-in/overview/javascript/v3
 */
import React, { Component } from 'react';
import { bool, func, shape, string } from 'prop-types';
import { Util } from '@magento/peregrine';
import defaultClasses from "./braintreeDropin.css";
import classify from "../../classify";
const {
  BrowserPersistence
} = Util;
const storage = new BrowserPersistence();
const {
  BRAINTREE_TOKEN
} = process.env;

class BraintreeDropin extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      isError: false
    });

    _defineProperty(this, "createDropinInstance", async () => {
      // import the dropin API
      const {
        default: dropin
      } = await import('braintree-web-drop-in'); // Create an instance of the BrainTree Web Drop In.

      return dropin.create({
        authorization: BRAINTREE_TOKEN,
        // Note: this selector must match to some part of this component's rendered HTML.
        container: '#braintree-dropin-container',
        card: {
          overrides: {
            fields: {
              number: {
                maskInput: {
                  // Only show the last four digits of the credit card number after focus exits this field.
                  showLastFour: true
                }
              }
            }
          }
        }
      });
    });

    _defineProperty(this, "requestPaymentNonce", async () => {
      const {
        dropinInstance
      } = this;

      try {
        const paymentNonce = await dropinInstance.requestPaymentMethod();
        this.props.onSuccess(paymentNonce);
      } catch (e) {
        // If payment details were missing or invalid but we have data from
        // a previous successful submission, use the previous data.
        const storedPayment = storage.getItem('paymentMethod');

        if (storedPayment) {
          this.props.onSuccess(storedPayment.data);
          return;
        } // An error occurred and we have no stored data.
        // BrainTree will update the UI with error messaging,
        // but signal that there was an error.


        console.error(`Invalid Payment Details. \n${e}`);
        this.props.onError();
      }
    });
  }

  async componentDidMount() {
    let isError;

    try {
      this.dropinInstance = await this.createDropinInstance();
      isError = false;
    } catch (err) {
      console.error(`Unable to initialize Credit Card form (Braintree). \n${err}`);
      isError = true;
    }

    this.setState({
      isError
    });
  }

  componentDidUpdate(prevProps) {
    const {
      dropinInstance
    } = this;
    const {
      isRequestingPaymentNonce
    } = this.props;

    if (dropinInstance && isRequestingPaymentNonce && !prevProps.isRequestingPaymentNonce) {
      // Our parent is telling us to request the payment nonce.
      this.requestPaymentNonce();
    }
  }

  render() {
    const {
      classes
    } = this.props;
    const {
      isError
    } = this.state;

    if (isError) {
      return React.createElement("span", {
        className: classes.error
      }, "There was an error loading payment options. Please try again later.");
    }

    return React.createElement("div", {
      className: classes.root
    }, React.createElement("div", {
      id: "braintree-dropin-container"
    }));
  }

}

_defineProperty(BraintreeDropin, "propTypes", {
  classes: shape({
    root: string
  }),
  isRequestingPaymentNonce: bool,
  onError: func.isRequired,
  onSuccess: func.isRequired
});

export default classify(defaultClasses)(BraintreeDropin);
//# sourceMappingURL=braintreeDropin.js.map