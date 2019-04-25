function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { func, number, shape, string } from 'prop-types';
import { Price } from '@magento/peregrine';
import classify from "../../classify";
import { Link, resourceUrl } from "@magento/venia-drivers";
import defaultClasses from "./suggestedProduct.css";
const productUrlSuffix = '.html';

class SuggestedProduct extends Component {
  render() {
    const {
      handleOnProductOpen,
      classes,
      url_key,
      small_image,
      name,
      price
    } = this.props;
    const productLink = resourceUrl(`/${url_key}${productUrlSuffix}`);
    return React.createElement("li", {
      className: classes.root
    }, React.createElement(Link, {
      onClick: handleOnProductOpen,
      to: productLink
    }, React.createElement("img", {
      className: classes.productImage,
      alt: name,
      src: resourceUrl(small_image, {
        type: 'image-product',
        width: 60
      })
    })), React.createElement(Link, {
      onClick: handleOnProductOpen,
      className: classes.productName,
      to: productLink
    }, name), React.createElement(Link, {
      onClick: handleOnProductOpen,
      to: productLink
    }, React.createElement(Price, {
      currencyCode: price.regularPrice.amount.currency,
      value: price.regularPrice.amount.value
    })));
  }

}

_defineProperty(SuggestedProduct, "propTypes", {
  handleOnProductOpen: func.isRequired,
  url_key: string.isRequired,
  small_image: string.isRequired,
  name: string.isRequired,
  price: shape({
    regularPrice: shape({
      amount: shape({
        currency: string,
        value: number
      })
    })
  }).isRequired,
  classes: shape({
    root: string,
    productName: string,
    productImage: string
  })
});

export default classify(defaultClasses)(SuggestedProduct);
//# sourceMappingURL=suggestedProduct.js.map