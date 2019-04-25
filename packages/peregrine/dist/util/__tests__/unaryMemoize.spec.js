import memoize from '../unaryMemoize';
test('caches results', function () {
  var fn = memoize(function (i) {
    return {
      i: i
    };
  });
  var a = fn(0);
  var b = fn(1);
  var c = fn(0);
  expect(a).not.toBe(b);
  expect(a).toBe(c);
});
test('calls the function only on cache miss', function () {
  var noop = jest.fn();
  var fn = memoize(function (i) {
    return noop(i);
  });
  fn(0);
  fn(0);
  fn(1);
  expect(noop).toHaveBeenCalledTimes(2);
});
//# sourceMappingURL=unaryMemoize.spec.js.map