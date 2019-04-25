import iterable from '../iterable';
var name = 'MyComponent';
var props = {
  b: null,
  c: '',
  d: [],
  e: new Map(),
  f: {}
};
test('returns nothing if prop is undefined', function () {
  var result = iterable(props, 'a', name);
  expect(result).toBeUndefined();
});
test('returns nothing if prop is `null`', function () {
  var result = iterable(props, 'b', name);
  expect(result).toBeUndefined();
});
test('returns an error if required and prop is undefined', function () {
  var result = iterable.isRequired(props, 'a', name);
  expect(result).toBeInstanceOf(Error);
});
test('returns an error if required and prop is `null`', function () {
  var result = iterable.isRequired(props, 'b', name);
  expect(result).toBeInstanceOf(Error);
});
test('returns nothing if prop is a string', function () {
  var result = iterable(props, 'c', name);
  expect(result).toBeUndefined();
});
test('returns nothing if prop is an array', function () {
  var result = iterable(props, 'd', name);
  expect(result).toBeUndefined();
});
test('returns nothing if prop is a Map', function () {
  var result = iterable(props, 'e', name);
  expect(result).toBeUndefined();
});
test('returns an error if prop is not iterable', function () {
  var result = iterable(props, 'f', name);
  expect(result).toBeInstanceOf(Error);
});
test('returns a proper error object', function () {
  var result = iterable(props, 'f', name);

  var thrower = function thrower() {
    throw result;
  };

  expect(thrower).toThrow('Invalid prop `f` of type `object` supplied to `MyComponent`, expected `iterable`.');
});
//# sourceMappingURL=iterable.spec.js.map