import _objectSpread from "@babel/runtime/helpers/objectSpread";
import React from 'react';
import { mount } from 'enzyme';
import { RouteProvider } from '../../Router';
import Page from '../Page';
jest.mock('../../Router/MagentoRouteHandler');
var context = {
  one: 1
};
test('renders `MagentoRouteHandler` with context as props', function () {
  // we need to test context consumer, so we can't shallow render
  var wrapper = mount(React.createElement(RouteProvider, {
    value: context
  }, React.createElement(Page, null)));
  expect(wrapper.find('MagentoRouteHandler').props()).toEqual(context);
});
test('passes props to `MagentoRouteHandler`', function () {
  var props = {
    two: 2
  }; // we need to test context consumer, so we can't shallow render

  var wrapper = mount(React.createElement(RouteProvider, {
    value: context
  }, React.createElement(Page, props)));
  expect(wrapper.find('MagentoRouteHandler').props()).toEqual(_objectSpread({}, props, context));
});
//# sourceMappingURL=Page.spec.js.map