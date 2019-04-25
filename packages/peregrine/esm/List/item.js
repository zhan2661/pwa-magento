function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fromRenderProp from "../util/fromRenderProp";

class Item extends Component {
  get children() {
    const {
      item
    } = this.props;
    const isString = typeof item === 'string';
    return isString ? item : null;
  }

  render() {
    const _this$props = this.props,
          {
      classes,
      hasFocus,
      isSelected,
      item,
      itemIndex,
      render
    } = _this$props,
          restProps = _objectWithoutProperties(_this$props, ["classes", "hasFocus", "isSelected", "item", "itemIndex", "render"]);

    const customProps = {
      classes,
      hasFocus,
      isSelected,
      item,
      itemIndex
    };
    const Root = fromRenderProp(render, Object.keys(customProps));
    return React.createElement(Root, _extends({
      className: classes.root
    }, customProps, restProps), this.children);
  }

}

_defineProperty(Item, "propTypes", {
  classes: PropTypes.shape({
    root: PropTypes.string
  }),
  hasFocus: PropTypes.bool,
  isSelected: PropTypes.bool,
  item: PropTypes.any.isRequired,
  itemIndex: PropTypes.number.isRequired,
  render: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired
});

_defineProperty(Item, "defaultProps", {
  classes: {},
  hasFocus: false,
  isSelected: false,
  render: 'div'
});

export default Item;
//# sourceMappingURL=item.js.map