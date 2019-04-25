import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fromRenderProp from '../util/fromRenderProp';
import iterable from '../validators/iterable';
import Items from './items';
/**
 * The **List** component maps a collection of data objects into an array of elements.
 * It also manages the selection and focus of those elements.
 */

var List =
/*#__PURE__*/
function (_Component) {
  _inherits(List, _Component);

  function List() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, List);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(List)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "handleSelectionChange", function (selection) {
      var onSelectionChange = _this.props.onSelectionChange;

      if (onSelectionChange) {
        onSelectionChange(selection);
      }
    });

    return _this;
  }

  _createClass(List, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          classes = _this$props.classes,
          getItemKey = _this$props.getItemKey,
          items = _this$props.items,
          render = _this$props.render,
          renderItem = _this$props.renderItem,
          onSelectionChange = _this$props.onSelectionChange,
          selectionModel = _this$props.selectionModel,
          restProps = _objectWithoutProperties(_this$props, ["classes", "getItemKey", "items", "render", "renderItem", "onSelectionChange", "selectionModel"]);

      var customProps = {
        classes: classes,
        getItemKey: getItemKey,
        items: items,
        onSelectionChange: onSelectionChange,
        selectionModel: selectionModel
      };
      var Root = fromRenderProp(render, Object.keys(customProps));
      return React.createElement(Root, _extends({
        className: classes.root
      }, customProps, restProps), React.createElement(Items, {
        items: items,
        getItemKey: getItemKey,
        renderItem: renderItem,
        selectionModel: selectionModel,
        onSelectionChange: this.handleSelectionChange
      }));
    }
  }]);

  return List;
}(Component);

_defineProperty(List, "propTypes", {
  /**
   * Class names to use when styling this component
   */
  classes: PropTypes.shape({
    root: PropTypes.string
  }),
  getItemKey: PropTypes.func.isRequired,

  /**
   * An iterable that yields `[key, item]` pairs such as an ES2015 Map
   */
  items: iterable.isRequired,

  /**
   * A render prop for the list element. A tagname string, such as `"div"`, is also valid.
   */
  render: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,

  /**
   * A render prop for the list item elements. A tagname string, such as `"div"`, is also valid.
   */
  renderItem: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),

  /**
   * A callback that fires when the selection state changes.
   */
  onSelectionChange: PropTypes.func,

  /**
   * A string corresponding to a selection model.
   */
  selectionModel: PropTypes.oneOf(['checkbox', 'radio'])
});

_defineProperty(List, "defaultProps", {
  classes: {},
  getItemKey: function getItemKey(_ref) {
    var id = _ref.id;
    return id;
  },
  items: [],
  render: 'div',
  renderItem: 'div',
  selectionModel: 'radio'
});

export default List;
//# sourceMappingURL=list.js.map