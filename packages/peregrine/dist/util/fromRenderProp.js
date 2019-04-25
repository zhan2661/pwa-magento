import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import React from 'react'; // memoization cache

var cache = new Map();
export var filterProps = function filterProps() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var blacklist = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return Object.entries(props).reduce(function (r, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        k = _ref2[0],
        v = _ref2[1];

    if (!blacklist.includes(k)) {
      r[k] = v;
    }

    return r;
  }, {});
};

var fromRenderProp = function fromRenderProp(elementType) {
  var customProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var isComposite = typeof elementType === 'function'; // if `elementType` is a function, it's already a component

  if (isComposite) {
    return elementType;
  } // sort and de-dupe `customProps`


  var uniqueCustomProps = Array.from(new Set(_toConsumableArray(customProps).sort())); // hash arguments for memoization

  var key = "".concat(elementType, "//").concat(uniqueCustomProps.join(',')); // only create a new component if not cached
  // otherwise React will unmount on every render

  if (!cache.has(key)) {
    // create an SFC that renders a node of type `elementType`
    // and filter any props that shouldn't be written to the DOM
    var Component = function Component(props) {
      return React.createElement(elementType, filterProps(props, uniqueCustomProps));
    };

    Component.displayName = "fromRenderProp(".concat(elementType, ")");
    cache.set(key, Component);
  }

  return cache.get(key);
};

export default fromRenderProp;
//# sourceMappingURL=fromRenderProp.js.map