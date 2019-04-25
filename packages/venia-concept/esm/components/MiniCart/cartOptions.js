function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component, Suspense } from 'react';
import { array, bool, func, number, shape, string } from 'prop-types';
import { Form } from 'informed';
import { Price } from '@magento/peregrine';
import LoadingIndicator from "../LoadingIndicator";
import classify from "../../classify";
import defaultClasses from "./cartOptions.css";
import Button from "../Button";
import Quantity from "../ProductQuantity";
import appendOptionsToPayload from "../../util/appendOptionsToPayload";
import isProductConfigurable from "../../util/isProductConfigurable"; // TODO: get real currencyCode for cartItem

const currencyCode = 'USD';
const Options = React.lazy(() => import("../ProductOptions"));

class CartOptions extends Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "setQuantity", quantity => this.setState({
      quantity
    }));

    _defineProperty(this, "handleSelectionChange", (optionId, selection) => {
      this.setState(({
        optionSelections
      }) => ({
        optionSelections: new Map(optionSelections).set(optionId, Array.from(selection).pop())
      }));
    });

    _defineProperty(this, "handleClick", async () => {
      const {
        updateCart,
        cartItem,
        configItem
      } = this.props;
      const {
        optionSelections,
        quantity
      } = this.state;
      const payload = {
        item: configItem,
        productType: configItem.__typename,
        quantity: quantity
      };

      if (isProductConfigurable(configItem)) {
        appendOptionsToPayload(payload, optionSelections);
      }

      updateCart(payload, cartItem.item_id);
    });

    this.state = {
      optionSelections: new Map(),
      quantity: props.cartItem.qty
    };
  }

  get fallback() {
    return React.createElement(LoadingIndicator, null, "Fetching Data");
  }

  render() {
    const {
      fallback,
      handleSelectionChange,
      props
    } = this;
    const {
      classes,
      cartItem,
      configItem,
      isUpdatingItem
    } = props;
    const {
      name,
      price
    } = cartItem;
    const modalClass = isUpdatingItem ? classes.modal_active : classes.modal;
    const options = isProductConfigurable(configItem) ? React.createElement(Suspense, {
      fallback: fallback
    }, React.createElement("section", {
      className: classes.options
    }, React.createElement(Options, {
      options: configItem.configurable_options,
      onSelectionChange: handleSelectionChange
    }))) : null;
    return React.createElement(Form, {
      className: classes.root
    }, React.createElement("div", {
      className: classes.focusItem
    }, React.createElement("span", {
      className: classes.name
    }, name), React.createElement("span", {
      className: classes.price
    }, React.createElement(Price, {
      currencyCode: currencyCode,
      value: price
    }))), React.createElement("div", {
      className: classes.form
    }, options, React.createElement("section", {
      className: classes.quantity
    }, React.createElement("h2", {
      className: classes.quantityTitle
    }, React.createElement("span", null, "Quantity")), React.createElement(Quantity, {
      initialValue: props.cartItem.qty,
      onValueChange: this.setQuantity
    }))), React.createElement("div", {
      className: classes.save
    }, React.createElement(Button, {
      onClick: this.props.closeOptionsDrawer
    }, React.createElement("span", null, "Cancel")), React.createElement(Button, {
      priority: "high",
      onClick: this.handleClick
    }, React.createElement("span", null, "Update Cart"))), React.createElement("div", {
      className: modalClass
    }, React.createElement(LoadingIndicator, null, "Updating Cart")));
  }

}

_defineProperty(CartOptions, "propTypes", {
  classes: shape({
    root: string,
    focusItem: string,
    price: string,
    form: string,
    quantity: string,
    quantityTitle: string,
    save: string,
    modal: string,
    modal_active: string,
    options: string
  }),
  cartItem: shape({
    item_id: number.isRequired,
    name: string.isRequired,
    price: number.isRequired,
    qty: number.isRequired
  }),
  configItem: shape({
    __typename: string,
    configurable_options: array
  }),
  isUpdatingItem: bool,
  updateCart: func.isRequired,
  closeOptionsDrawer: func.isRequired
});

export default classify(defaultClasses)(CartOptions);
//# sourceMappingURL=cartOptions.js.map