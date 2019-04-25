import React from 'react';
import { shallow } from 'enzyme';
import fromRenderProp, { filterProps } from '../fromRenderProp';
test('returns a component', function () {
  var Div = fromRenderProp('div');
  expect(Div).toBeInstanceOf(Function);
});
test('returns a basic component that renders', function () {
  var Div = fromRenderProp('div');
  var wrapper = shallow(React.createElement(Div, null, "foo"));
  expect(wrapper.prop('children')).toBe('foo');
});
test('returns a composite component that renders', function () {
  var Foo = function Foo(props) {
    return React.createElement("div", props);
  };

  var WrappedFoo = fromRenderProp(Foo);
  var wrapper = shallow(React.createElement(WrappedFoo, null, "foo"));
  expect(wrapper.prop('children')).toBe('foo');
});
test('excludes custom props for a basic component', function () {
  var Div = fromRenderProp('div', ['foo']);
  var wrapper = shallow(React.createElement(Div, {
    foo: "bar"
  }));
  expect(wrapper.prop('foo')).toBeUndefined();
});
test('includes custom props for a composite component', function () {
  var Foo = function Foo(props) {
    return React.createElement("div", props);
  };

  var WrappedFoo = fromRenderProp(Foo, ['foo']);
  var wrapper = shallow(React.createElement(WrappedFoo, {
    foo: "bar"
  }));
  expect(wrapper.prop('foo')).toBe('bar');
});
test('`filterProps` returns an object', function () {
  expect(filterProps()).toEqual({});
});
test('`filterProps` filters properties from an object', function () {
  var input = {
    a: 0,
    b: 1
  };
  var output = {
    b: 1
  };
  var excludedProps = ['a'];
  expect(filterProps(input, excludedProps)).toEqual(output);
});
//# sourceMappingURL=fromRenderProp.spec.js.map