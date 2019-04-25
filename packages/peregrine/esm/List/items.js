function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import memoize from "../util/unaryMemoize";
import iterable from "../validators/iterable";
import ListItem from "./item";

const removeFocus = () => ({
  hasFocus: false
});

const updateCursor = memoize(index => () => ({
  cursor: index,
  hasFocus: true
}));
const updateSelection = memoize(key => (prevState, props) => {
  const {
    selectionModel
  } = props;
  let selection;

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
    selection
  };
});

class Items extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      cursor: null,
      hasFocus: false,
      selection: new Set()
    });

    _defineProperty(this, "handleBlur", () => {
      this.setState(removeFocus);
    });

    _defineProperty(this, "getClickHandler", memoize(key => () => {
      this.setState(updateSelection(key), this.syncSelection);
    }));

    _defineProperty(this, "getFocusHandler", memoize(index => () => {
      this.setState(updateCursor(index));
    }));
  }

  render() {
    const {
      getItemKey,
      items,
      renderItem
    } = this.props;
    const {
      cursor,
      hasFocus,
      selection
    } = this.state;
    const children = Array.from(items, (item, index) => {
      const key = getItemKey(item, index);
      return React.createElement(ListItem, {
        key: key,
        item: item,
        itemIndex: index,
        render: renderItem,
        hasFocus: hasFocus && cursor === index,
        isSelected: selection.has(key),
        onBlur: this.handleBlur,
        onClick: this.getClickHandler(key),
        onFocus: this.getFocusHandler(index)
      });
    });
    return React.createElement(Fragment, null, children);
  }

  syncSelection() {
    const {
      selection
    } = this.state;
    const {
      onSelectionChange
    } = this.props;

    if (onSelectionChange) {
      onSelectionChange(selection);
    }
  }

}

_defineProperty(Items, "propTypes", {
  getItemKey: PropTypes.func.isRequired,
  items: iterable.isRequired,
  renderItem: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  selectionModel: PropTypes.oneOf(['checkbox', 'radio'])
});

_defineProperty(Items, "defaultProps", {
  getItemKey: ({
    id
  }) => id,
  selectionModel: 'radio'
});

export default Items;
//# sourceMappingURL=items.js.map