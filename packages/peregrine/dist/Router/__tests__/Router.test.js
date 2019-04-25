import React from 'react';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import MagentoRouter, { Consumer as RouteConsumer } from '../Router';
var apiBase = 'https://store.com';
var initialEntries = ['/some-product.html'];
var routerProps = {
  initialEntries: initialEntries
};
test('renders a single, catch-all route', function () {
  var routesWrapper = shallow(React.createElement(MagentoRouter, {
    using: MemoryRouter,
    apiBase: apiBase
  })).find('Route');
  expect(routesWrapper.length).toBe(1);
  expect(routesWrapper.prop('path')).toBeUndefined();
});
test('passes `config` and route props to context provider', function () {
  var fn = jest.fn();
  var props = {
    apiBase: apiBase,
    using: MemoryRouter
  }; // we need to test context consumer, so we can't shallow render

  mount(React.createElement(MagentoRouter, props, React.createElement(RouteConsumer, null, fn)));
  expect(fn).toHaveBeenCalledWith(expect.objectContaining({
    apiBase: apiBase,
    history: expect.anything(),
    // from Route
    location: expect.anything(),
    // from Route
    match: expect.anything() // from Route

  }));
});
test('passes `routerProps` to router, not context provider', function () {
  var fn = jest.fn();
  var props = {
    apiBase: apiBase,
    routerProps: routerProps,
    using: MemoryRouter
  }; // we need to test context consumer, so we can't shallow render

  var wrapper = mount(React.createElement(MagentoRouter, props, React.createElement(RouteConsumer, null, fn)));
  expect(fn).toHaveBeenCalledWith(expect.not.objectContaining({
    initialEntries: expect.anything()
  }));
  expect(wrapper.find('Router').instance().props).toEqual(expect.objectContaining({}));
  expect(fn).toHaveBeenCalledWith(expect.objectContaining({
    history: expect.objectContaining({
      length: initialEntries.length
    })
  }));
});
//# sourceMappingURL=Router.test.js.map