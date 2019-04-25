import _extends from "@babel/runtime/helpers/extends";
import React from 'react';
import { shallow } from 'enzyme';
import { Item } from '../index.js';
var classes = {
  root: 'abc'
};
test('renders a div by default', function () {
  var props = {
    item: 'a',
    itemIndex: 1
  };
  var wrapper = shallow(React.createElement(Item, props)).dive();
  expect(wrapper.type()).toEqual('div');
});
test('renders a provided tagname', function () {
  var props = {
    item: 'a',
    render: 'p',
    itemIndex: 1
  };
  var wrapper = shallow(React.createElement(Item, props)).dive();
  expect(wrapper.type()).toEqual('p');
});
test('renders a provided component', function () {
  var Span = function Span() {
    return React.createElement("span", null);
  };

  var props = {
    item: 'a',
    render: Span,
    itemIndex: 1
  };
  var wrapper = shallow(React.createElement(Item, props));
  expect(wrapper.type()).toEqual(Span);
  expect(wrapper.dive().type()).toEqual('span');
});
test('passes only rest props to basic `render`', function () {
  var props = {
    classes: classes,
    item: 'a',
    render: 'p',
    itemIndex: 1
  };
  var wrapper = shallow(React.createElement(Item, _extends({}, props, {
    "data-id": "b"
  }))).dive();
  expect(wrapper.props()).toHaveProperty('data-id');
  expect(wrapper.props()).not.toHaveProperty('classes');
  expect(wrapper.props()).not.toHaveProperty('hasFocus');
  expect(wrapper.props()).not.toHaveProperty('isSelected');
  expect(wrapper.props()).not.toHaveProperty('item');
  expect(wrapper.props()).not.toHaveProperty('render');
});
test('passes custom and rest props to composite `render`', function () {
  var Span = function Span() {
    return React.createElement("span", null);
  };

  var itemIndex = 1;
  var props = {
    classes: classes,
    item: 'a',
    render: Span,
    itemIndex: itemIndex
  };
  var wrapper = shallow(React.createElement(Item, _extends({}, props, {
    "data-id": "b"
  })));
  expect(wrapper.props()).toHaveProperty('data-id');
  expect(wrapper.props()).toHaveProperty('classes');
  expect(wrapper.props()).toHaveProperty('hasFocus');
  expect(wrapper.props()).toHaveProperty('isSelected');
  expect(wrapper.props()).toHaveProperty('item');
  expect(wrapper.props()).toHaveProperty('itemIndex');
  expect(wrapper.prop('itemIndex')).toBe(itemIndex);
  expect(wrapper.props()).not.toHaveProperty('render');
});
test('passes `item` as `children` if `item` is a string', function () {
  var props = {
    item: 'a',
    render: 'p',
    itemIndex: 1
  };
  var wrapper = shallow(React.createElement(Item, props)).dive();
  expect(wrapper.text()).toEqual('a');
});
test('does not pass `children` if `item` is not a string', function () {
  var props = {
    item: {
      id: 1
    },
    render: 'p',
    itemIndex: 1
  };
  var wrapper = shallow(React.createElement(Item, props)).dive();
  expect(wrapper.text()).toBe('');
});
//# sourceMappingURL=item.spec.js.map