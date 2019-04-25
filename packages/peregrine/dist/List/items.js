import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import memoize from '../util/unaryMemoize';
import iterable from '../validators/iterable';
import ListItem from './item';

var removeFocus = function removeFocus() {
  return {
    hasFocus: false
  };
};

var updateCursor = memoize(function (index) {
  return function () {
    return {
      cursor: index,
      hasFocus: true
    };
  };
});
var updateSelection = memoize(function (key) {
  return function (prevState, props) {
    var selectionModel = props.selectionModel;
    var selection;

    if (selectionModel === 'radio') {
      selection = new Set().add(key);
    }

    if (selectionModel === 'checkbox') {
      selection = new Set(prevState.selection);

      if (selection.has(key)) {
        selection.delete(key);
      } else {
        selection.add(key);
      }
    }

    return {
      selection: selection
    };
  };
});

var Items =
/*#__PURE__*/
function (_Component) {
  _inherits(Items, _Component);

  function Items() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Items);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Items)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      cursor: null,
      hasFocus: false,
      selection: new Set()
    });

    _defineProperty(_assertThisInitialized(_this), "handleBlur", function () {
      _this.setState(removeFocus);
    });

    _defineProperty(_assertThisInitialized(_this), "getClickHandler", memoize(function (key) {
      return function () {
        _this.setState(updateSelection(key), _this.syncSelection);
      };
    }));

    _defineProperty(_assertThisInitialized(_this), "getFocusHandler", memoize(function (index) {
      return function () {
        _this.setState(updateCursor(index));
      };
    }));

    return _this;
  }

  _createClass(Items, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          getItemKey = _this$props.getItemKey,
          items = _this$props.items,
          renderItem = _this$props.renderItem;
      var _this$state = this.state,
          cursor = _this$state.cursor,
          hasFocus = _this$state.hasFocus,
          selection = _this$state.selection;
      var children = Array.from(items, function (item, index) {
        var key = getItemKey(item, index);
        return React.createElement(ListItem, {
          key: key,
          item: item,
          itemIndex: index,
          render: renderItem,
          hasFocus: hasFocus && cursor === index,
          isSelected: selection.has(key),
          onBlur: _this2.handleBlur,
          onClick: _this2.getClickHandler(key),
          onFocus: _this2.getFocusHandler(index)
        });
      });
      return React.createElement(Fragment, null, children);
    }
  }, {
    key: "syncSelection",
    value: function syncSelection() {
      var selection = this.state.selection;
      var onSelectionChange = this.props.onSelectionChange;

      if (onSelectionChange) {
        onSelectionChange(selection);
      }
    }
  }]);

  return Items;
}(Component);

_defineProperty(Items, "propTypes", {
  getItemKey: PropTypes.func.isRequired,
  items: iterable.isRequired,
  renderItem: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  selectionModel: PropTypes.oneOf(['checkbox', 'radio'])
});

_defineProperty(Items, "defaultProps", {
  getItemKey: function getItemKey(_ref) {
    var id = _ref.id;
    return id;
  },
  selectionModel: 'radio'
});

export default Items;
//# sourceMappingURL=items.js.map