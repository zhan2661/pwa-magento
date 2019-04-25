import _typeof from "@babel/runtime/helpers/typeof";

var isIterable = function isIterable(obj) {
  return typeof obj[Symbol.iterator] === 'function';
};

function optionalIterable(props, propName, componentName) {
  var prop = props[propName];

  var type = _typeof(prop);

  if (prop != null && !isIterable(prop)) {
    return new Error("Invalid prop `".concat(propName, "` of type `").concat(type, "` supplied to `").concat(componentName, "`, expected `iterable`."));
  }
}

function requiredIterable(props, propName, componentName) {
  var prop = props[propName];

  var type = _typeof(prop);

  if (prop == null || !isIterable(prop)) {
    return new Error("Invalid prop `".concat(propName, "` of type `").concat(type, "` supplied to `").concat(componentName, "`, expected `iterable`."));
  }
}

optionalIterable.isRequired = requiredIterable;
export default optionalIterable;
//# sourceMappingURL=iterable.js.map