function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fromRenderProp from "../util/fromRenderProp";
import iterable from "../validators/iterable";
import Items from "./items";
/**
 * The **List** component maps a collection of data objects into an array of elements.
 * It also manages the selection and focus of those elements.
 */

class List extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "handleSelectionChange", selection => {
      const {
        onSelectionChange
      } = this.props;

      if (onSelectionChange) {
        onSelectionChange(selection);
      }
    });
  }

  render() {
    const _this$props = this.props,
          {
      classes,
      getItemKey,
      items,
      render,
      renderItem,
      onSelectionChange,
      selectionModel
    } = _this$props,
          restProps = _objectWithoutProperties(_this$props, ["classes", "getItemKey", "items", "render", "renderItem", "onSelectionChange", "selectionModel"]);

    const customProps = {
      classes,
      getItemKey,
      items,
      onSelectionChange,
      selectionModel
    };
    const Root = fromRenderProp(render, Object.keys(customProps));
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

}

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
  getItemKey: ({
    id
  }) => id,
  items: [],
  render: 'div',
  renderItem: 'div',
  selectionModel: 'radio'
});

export default List;
//# sourceMappingURL=list.js.map