var memoize = function memoize(fn) {
  var cache = new Map();
  return function (x) {
    return cache.has(x) ? cache.get(x) : cache.set(x, fn(x)).get(x);
  };
};

export default memoize;
//# sourceMappingURL=unaryMemoize.js.map