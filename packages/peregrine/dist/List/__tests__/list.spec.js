import _extends from "@babel/runtime/helpers/extends";
import React, { Fragment } from 'react';
import { shallow } from 'enzyme';
import List from '..';
var classes = {
  root: 'abc'
};
var items = [{
  id: '001',
  name: 'Test Product 1',
  small_image: '/test/product/1.png',
  price: {
    regularPrice: {
      amount: {
        value: 100
      }
    }
  }
}, {
  id: '002',
  name: 'Test Product 2',
  small_image: '/test/product/2.png',
  price: {
    regularPrice: {
      amount: {
        value: 100
      }
    }
  }
}];
test('renders a div by default', function () {
  var props = {
    classes: classes
  };
  var wrapper = shallow(React.createElement(List, props)).dive();
  expect(wrapper.type()).toEqual('div');
  expect(wrapper.prop('className')).toEqual(classes.root);
});
test('renders a provided tagname', function () {
  var props = {
    classes: classes,
    render: 'ul'
  };
  var wrapper = shallow(React.createElement(List, props)).dive();
  expect(wrapper.type()).toEqual('ul');
  expect(wrapper.prop('className')).toEqual(classes.root);
});
test('renders a provided component', function () {
  var Nav = function Nav() {
    return React.createElement("nav", null);
  };

  var props = {
    render: Nav
  };
  var wrapper = shallow(React.createElement(List, props));
  expect(wrapper.type()).toEqual(Nav);
  expect(wrapper.dive().type()).toEqual('nav');
});
test('passes only rest props to basic `render`', function () {
  var props = {
    classes: classes,
    items: items,
    render: 'ul',
    renderItem: 'li'
  };
  var wrapper = shallow(React.createElement(List, _extends({}, props, {
    "data-id": "b"
  }))).dive();
  expect(wrapper.props()).toHaveProperty('data-id');
  expect(wrapper.props()).not.toHaveProperty('classes');
  expect(wrapper.props()).not.toHaveProperty('items');
  expect(wrapper.props()).not.toHaveProperty('onSelectionChange');
  expect(wrapper.props()).not.toHaveProperty('selectionModel');
  expect(wrapper.props()).not.toHaveProperty('render');
  expect(wrapper.props()).not.toHaveProperty('renderItem');
});
test('passes custom and rest props to composite `render`', function () {
  var Nav = function Nav() {
    return React.createElement("nav", null);
  };

  var props = {
    classes: classes,
    items: items,
    render: Nav,
    renderItem: 'a'
  };
  var wrapper = shallow(React.createElement(List, _extends({}, props, {
    "data-id": "b"
  })));
  expect(wrapper.props()).toHaveProperty('data-id');
  expect(wrapper.props()).toHaveProperty('classes');
  expect(wrapper.props()).toHaveProperty('items');
  expect(wrapper.props()).toHaveProperty('onSelectionChange');
  expect(wrapper.props()).toHaveProperty('selectionModel');
  expect(wrapper.props()).not.toHaveProperty('render');
  expect(wrapper.props()).not.toHaveProperty('renderItem');
});
test('renders a fragment as `children`', function () {
  var props = {
    classes: classes,
    items: items
  };
  var wrapper = shallow(React.createElement(List, props));
  expect(wrapper.childAt(0).dive().type()).toEqual(Fragment);
});
test('passes correct props through to `Items`', function () {
  var Item = function Item() {
    return React.createElement("li", null);
  };

  var selectionModel = 'checkbox';
  var props = {
    items: items,
    renderItem: Item,
    selectionModel: selectionModel
  };
  var wrapper = shallow(React.createElement(List, props));
  expect(wrapper.childAt(0).props()).toMatchObject(props);
});
test('calls `onSelectionChange` on selection change', function () {
  var onSelectionChange = jest.fn();
  var selection = new Set();
  var props = {
    items: items,
    onSelectionChange: onSelectionChange
  };
  var wrapper = shallow(React.createElement(List, props));
  wrapper.instance().handleSelectionChange(selection);
  expect(onSelectionChange).toHaveBeenCalledWith(selection);
});
test('does not throw if `onSelectionChange` is not provided', function () {
  var selection = new Set();
  var props = {
    items: items
  };
  var wrapper = shallow(React.createElement(List, props));

  var cb = function cb() {
    return wrapper.instance().handleSelectionChange(selection);
  };

  expect(cb).not.toThrow();
});
//# sourceMappingURL=list.spec.js.map