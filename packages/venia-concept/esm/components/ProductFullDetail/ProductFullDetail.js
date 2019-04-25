function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component, Suspense } from 'react';
import { arrayOf, bool, func, number, shape, string } from 'prop-types';
import { Form } from 'informed';
import { Price } from '@magento/peregrine';
import { compose } from 'redux';
import classify from "../../classify";
import { connect } from "@magento/venia-drivers";
import Button from "../Button";
import { loadingIndicator } from "../LoadingIndicator";
import Carousel from "../ProductImageCarousel";
import Quantity from "../ProductQuantity";
import RichText from "../RichText";
import defaultClasses from "./productFullDetail.css";
import appendOptionsToPayload from "../../util/appendOptionsToPayload";
import findMatchingVariant from "../../util/findMatchingProductVariant";
import isProductConfigurable from "../../util/isProductConfigurable";
const Options = React.lazy(() => import("../ProductOptions"));

class ProductFullDetail extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      optionCodes: new Map(),
      optionSelections: new Map(),
      quantity: 1
    });

    _defineProperty(this, "setQuantity", quantity => this.setState({
      quantity
    }));

    _defineProperty(this, "addToCart", () => {
      const {
        props,
        state
      } = this;
      const {
        optionSelections,
        quantity,
        optionCodes
      } = state;
      const {
        addToCart,
        product
      } = props;
      const payload = {
        item: product,
        productType: product.__typename,
        quantity
      };

      if (isProductConfigurable(product)) {
        appendOptionsToPayload(payload, optionSelections, optionCodes);
      }

      addToCart(payload);
    });

    _defineProperty(this, "handleSelectionChange", (optionId, selection) => {
      this.setState(({
        optionSelections
      }) => ({
        optionSelections: new Map(optionSelections).set(optionId, Array.from(selection).pop())
      }));
    });
  }

  static getDerivedStateFromProps(props, state) {
    const {
      configurable_options
    } = props.product;
    const optionCodes = new Map(state.optionCodes); // if this is a simple product, do nothing

    if (!isProductConfigurable(props.product)) {
      return null;
    } // otherwise, cache attribute codes to avoid lookup cost later


    for (const option of configurable_options) {
      optionCodes.set(option.attribute_id, option.attribute_code);
    }

    return {
      optionCodes
    };
  }

  get fallback() {
    return loadingIndicator;
  }

  get productOptions() {
    const {
      fallback,
      handleSelectionChange,
      props
    } = this;
    const {
      configurable_options
    } = props.product;
    const isConfigurable = isProductConfigurable(props.product);

    if (!isConfigurable) {
      return null;
    }

    return React.createElement(Suspense, {
      fallback: fallback
    }, React.createElement(Options, {
      options: configurable_options,
      onSelectionChange: handleSelectionChange
    }));
  }

  get mediaGalleryEntries() {
    const {
      props,
      state
    } = this;
    const {
      product
    } = props;
    const {
      optionCodes,
      optionSelections
    } = state;
    const {
      media_gallery_entries,
      variants
    } = product;
    const isConfigurable = isProductConfigurable(product);

    if (!isConfigurable || isConfigurable && optionSelections.size === 0) {
      return media_gallery_entries;
    }

    const item = findMatchingVariant({
      optionCodes,
      optionSelections,
      variants
    });

    if (!item) {
      return media_gallery_entries;
    }

    return item.product.media_gallery_entries;
  }

  get isMissingOptions() {
    const {
      product
    } = this.props; // Non-configurable products can't be missing options

    if (!isProductConfigurable(product)) {
      return false;
    } // Configurable products are missing options if we have fewer
    // option selections than the product has options.


    const {
      configurable_options
    } = product;
    const numProductOptions = configurable_options.length;
    const numProductSelections = this.state.optionSelections.size;
    return numProductSelections < numProductOptions;
  }

  render() {
    const {
      addToCart,
      isMissingOptions,
      mediaGalleryEntries,
      productOptions,
      props
    } = this;
    const {
      classes,
      isAddingItem,
      product
    } = props;
    const {
      regularPrice
    } = product.price; // We want this key to change whenever mediaGalleryEntries changes.
    // Make it dependent on a unique value in each entry (file),
    // and the order.

    const carouselKey = mediaGalleryEntries.reduce((fullKey, entry) => {
      return `${fullKey},${entry.file}`;
    }, '');
    return React.createElement(Form, {
      className: classes.root
    }, React.createElement("section", {
      className: classes.title
    }, React.createElement("h1", {
      className: classes.productName
    }, React.createElement("span", null, product.name)), React.createElement("p", {
      className: classes.productPrice
    }, React.createElement(Price, {
      currencyCode: regularPrice.amount.currency,
      value: regularPrice.amount.value
    }))), React.createElement("section", {
      className: classes.imageCarousel
    }, React.createElement(Carousel, {
      images: mediaGalleryEntries,
      key: carouselKey
    })), React.createElement("section", {
      className: classes.options
    }, productOptions), React.createElement("section", {
      className: classes.quantity
    }, React.createElement("h2", {
      className: classes.quantityTitle
    }, React.createElement("span", null, "Quantity")), React.createElement(Quantity, {
      initialValue: this.state.quantity,
      onValueChange: this.setQuantity
    })), React.createElement("section", {
      className: classes.cartActions
    }, React.createElement(Button, {
      priority: "high",
      onClick: addToCart,
      disabled: isAddingItem || isMissingOptions
    }, React.createElement("span", null, "Add to Cart"))), React.createElement("section", {
      className: classes.description
    }, React.createElement("h2", {
      className: classes.descriptionTitle
    }, React.createElement("span", null, "Product Description")), React.createElement(RichText, {
      content: product.description
    })), React.createElement("section", {
      className: classes.details
    }, React.createElement("h2", {
      className: classes.detailsTitle
    }, React.createElement("span", null, "SKU")), React.createElement("strong", null, product.sku)));
  }

}

_defineProperty(ProductFullDetail, "propTypes", {
  classes: shape({
    cartActions: string,
    description: string,
    descriptionTitle: string,
    details: string,
    detailsTitle: string,
    imageCarousel: string,
    options: string,
    productName: string,
    productPrice: string,
    quantity: string,
    quantityTitle: string,
    root: string,
    title: string
  }),
  product: shape({
    __typename: string,
    id: number,
    sku: string.isRequired,
    price: shape({
      regularPrice: shape({
        amount: shape({
          currency: string.isRequired,
          value: number.isRequired
        })
      }).isRequired
    }).isRequired,
    media_gallery_entries: arrayOf(shape({
      label: string,
      position: number,
      disabled: bool,
      file: string.isRequired
    })),
    description: string
  }).isRequired,
  addToCart: func.isRequired
});

const mapStateToProps = ({
  cart
}) => {
  return {
    isAddingItem: cart.isAddingItem
  };
};

export default compose(classify(defaultClasses), connect(mapStateToProps))(ProductFullDetail);
//# sourceMappingURL=ProductFullDetail.js.map