function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { resourceUrl } from "@magento/venia-drivers";
import classify from "../../classify";
import defaultClasses from "./thumbnail.css";
import { transparentPlaceholder } from "../../shared/images";

class Thumbnail extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "onClickHandlerWrapper", () => {
      const {
        onClickHandler,
        itemIndex
      } = this.props;
      onClickHandler(itemIndex);
    });
  }

  render() {
    const {
      classes,
      isActive,
      item: {
        file,
        label
      }
    } = this.props;
    const src = file ? resourceUrl(file, {
      type: 'image-product',
      width: 240
    }) : transparentPlaceholder;
    return React.createElement("button", {
      onClick: this.onClickHandlerWrapper,
      className: isActive ? classes.rootSelected : classes.root
    }, React.createElement("img", {
      className: classes.image,
      src: src,
      alt: label
    }));
  }

}

_defineProperty(Thumbnail, "propTypes", {
  classes: PropTypes.shape({
    root: PropTypes.string,
    rootSelected: PropTypes.string
  }),
  isActive: PropTypes.bool,
  item: PropTypes.shape({
    label: PropTypes.string,
    file: PropTypes.string.isRequired
  }),
  itemIndex: PropTypes.number,
  onClickHandler: PropTypes.func.isRequired
});

export default classify(defaultClasses)(Thumbnail);
//# sourceMappingURL=thumbnail.js.map