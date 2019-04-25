import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fromRenderProp from '../util/fromRenderProp';

var Item =
/*#__PURE__*/
function (_Component) {
  _inherits(Item, _Component);

  function Item() {
    _classCallCheck(this, Item);

    return _possibleConstructorReturn(this, _getPrototypeOf(Item).apply(this, arguments));
  }

  _createClass(Item, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          classes = _this$props.classes,
          hasFocus = _this$props.hasFocus,
          isSelected = _this$props.isSelected,
          item = _this$props.item,
          itemIndex = _this$props.itemIndex,
          render = _this$props.render,
          restProps = _objectWithoutProperties(_this$props, ["classes", "hasFocus", "isSelected", "item", "itemIndex", "render"]);

      var customProps = {
        classes: classes,
        hasFocus: hasFocus,
        isSelected: isSelected,
        item: item,
        itemIndex: itemIndex
      };
      var Root = fromRenderProp(render, Object.keys(customProps));
      return React.createElement(Root, _extends({
        className: classes.root
      }, customProps, restProps), this.children);
    }
  }, {
    key: "children",
    get: function get() {
      var item = this.props.item;
      var isString = typeof item === 'string';
      return isString ? item : null;
    }
  }]);

  return Item;
}(Component);

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