import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import React from 'react';
import MagentoRouteHandler from '../MagentoRouteHandler';
import { shallow } from 'enzyme';
import resolveUnknownRoute from '../resolveUnknownRoute';
var fetchRootComponent = global.fetchRootComponent = jest.fn();
jest.mock('../resolveUnknownRoute');
var apiBase = 'https://store.com';
var children = jest.fn();
var location = {
  pathname: '/foo.html'
};
var props = {
  apiBase: apiBase,
  children: children,
  location: location
};
var resolvedRoute = {
  type: 'CMS_PAGE',
  id: 2
};
beforeEach(function () {
  children.mockClear();
});
afterEach(function () {
  resolveUnknownRoute.mockRestore();
  fetchRootComponent.mockRestore();
});
test('renders `loading` while loading', function () {
  shallow(React.createElement(MagentoRouteHandler, props));
  expect(children).toHaveBeenCalledTimes(1);
  expect(children).toHaveBeenNthCalledWith(1, {
    hasError: false,
    internalError: false,
    loading: true,
    notFound: false
  });
});
test('renders `null` while loading if `children` is not a function', function () {
  var localProps = _objectSpread({}, props);

  delete localProps.children;
  shallow(React.createElement(MagentoRouteHandler, localProps));
  expect(children).not.toHaveBeenCalled();
});
test('renders `internalError` if `resolveUnknownRoute` fails',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee() {
  return _regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          resolveUnknownRoute.mockRejectedValue(new Error());
          shallow(React.createElement(MagentoRouteHandler, props));
          _context.next = 4;
          return Promise.resolve();

        case 4:
          // resolveUnknownRoute
          expect(children).toHaveBeenCalledTimes(2);
          expect(children).toHaveBeenNthCalledWith(1, {
            hasError: false,
            internalError: false,
            loading: true,
            notFound: false
          });
          expect(children).toHaveBeenNthCalledWith(2, {
            hasError: true,
            internalError: true,
            loading: false,
            notFound: false
          });

        case 7:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));
test('renders `notFound` if resolved route is not matched',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee2() {
  return _regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          resolveUnknownRoute.mockResolvedValue({
            matched: false
          });
          shallow(React.createElement(MagentoRouteHandler, props));
          _context2.next = 4;
          return Promise.resolve();

        case 4:
          // resolveUnknownRoute
          expect(children).toHaveBeenCalledTimes(2);
          expect(children).toHaveBeenNthCalledWith(1, {
            hasError: false,
            internalError: false,
            loading: true,
            notFound: false
          });
          expect(children).toHaveBeenNthCalledWith(2, {
            hasError: true,
            internalError: false,
            loading: false,
            notFound: true
          });

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2);
})));
test('renders `internalError` if `fetchRootComponent` fails',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee3() {
  var wrapper;
  return _regeneratorRuntime.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          resolveUnknownRoute.mockResolvedValue(resolvedRoute);
          fetchRootComponent.mockRejectedValue(new Error());
          wrapper = shallow(React.createElement(MagentoRouteHandler, props));
          _context3.next = 5;
          return Promise.resolve();

        case 5:
          _context3.next = 7;
          return Promise.resolve();

        case 7:
          // fetchRootComponent
          expect(wrapper.state('componentMap').size).toBe(1);
          expect(children).toHaveBeenCalledTimes(2);
          expect(children).toHaveBeenNthCalledWith(1, {
            hasError: false,
            internalError: false,
            loading: true,
            notFound: false
          });
          expect(children).toHaveBeenNthCalledWith(2, {
            hasError: true,
            internalError: true,
            loading: false,
            notFound: false
          });

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, _callee3);
})));
test('renders RootComponent if `fetchRootComponent` succeeds',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee4() {
  var RootComponent, wrapper;
  return _regeneratorRuntime.wrap(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          RootComponent = function RootComponent() {
            return React.createElement("i", null);
          };

          resolveUnknownRoute.mockResolvedValue(resolvedRoute);
          fetchRootComponent.mockResolvedValue(RootComponent);
          wrapper = shallow(React.createElement(MagentoRouteHandler, props));
          _context4.next = 6;
          return Promise.resolve();

        case 6:
          _context4.next = 8;
          return Promise.resolve();

        case 8:
          // fetchRootComponent
          expect(children).toHaveBeenCalledTimes(1);
          expect(children).toHaveBeenNthCalledWith(1, {
            hasError: false,
            internalError: false,
            loading: true,
            notFound: false
          });
          expect(wrapper.find(RootComponent)).toHaveLength(1);

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, _callee4);
})));
test('skips `fetchRootComponent` if path is known',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee5() {
  var RootComponent, wrapper;
  return _regeneratorRuntime.wrap(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          RootComponent = function RootComponent() {
            return React.createElement("i", null);
          };

          resolveUnknownRoute.mockResolvedValue(resolvedRoute);
          fetchRootComponent.mockResolvedValue(RootComponent);
          wrapper = shallow(React.createElement(MagentoRouteHandler, props));
          _context5.next = 6;
          return Promise.resolve();

        case 6:
          _context5.next = 8;
          return Promise.resolve();

        case 8:
          // fetchRootComponent
          // navigate to `bar`
          wrapper.setProps(_objectSpread({}, props, {
            location: {
              pathname: '/bar.html'
            }
          }));
          _context5.next = 11;
          return Promise.resolve();

        case 11:
          _context5.next = 13;
          return Promise.resolve();

        case 13:
          // fetchRootComponent
          // navigate back to `foo`
          wrapper.setProps(props);
          _context5.next = 16;
          return Promise.resolve();

        case 16:
          _context5.next = 18;
          return Promise.resolve();

        case 18:
          // fetchRootComponent
          expect(children).toHaveBeenCalledTimes(2);
          expect(fetchRootComponent).toHaveBeenCalledTimes(2);
          expect(wrapper.find(RootComponent)).toHaveLength(1);

        case 21:
        case "end":
          return _context5.stop();
      }
    }
  }, _callee5);
})));
//# sourceMappingURL=MagentoRouteHandler.test.js.map