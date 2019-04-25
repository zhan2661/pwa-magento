import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _typeof from "@babel/runtime/helpers/typeof";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import { func, shape, string } from 'prop-types'; // 2019-01-28 Removed virtual `FETCH_ROOT_COMPONENT` import. It's much cleaner
// to inject a "fetchRootComponent" global at build time, so that's what we
// changed the MagentoRootComponentsPlugin to do.

import resolveUnknownRoute from './resolveUnknownRoute';
var InternalError = Symbol('InternalError');
var NotFound = Symbol('NotFound');
var mountedInstances = new WeakSet();

var MagentoRouteHandler =
/*#__PURE__*/
function (_Component) {
  _inherits(MagentoRouteHandler, _Component);

  function MagentoRouteHandler() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, MagentoRouteHandler);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(MagentoRouteHandler)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      componentMap: new Map(),
      errorState: {
        hasError: false,
        internalError: false,
        notFound: false
      }
    });

    return _this;
  }

  _createClass(MagentoRouteHandler, [{
    key: "addToCache",
    // TODO: Add the ability to customize the cache name
    value: function () {
      var _addToCache = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee(urls) {
        var myCache;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (window.caches) {
                  _context.next = 2;
                  break;
                }

                throw new Error('Current environment does not support CacheStorage at window.caches.');

              case 2:
                _context.next = 4;
                return window.caches.open("workbox-runtime-".concat(location.origin, "/"));

              case 4:
                myCache = _context.sent;
                _context.next = 7;
                return myCache.addAll(urls);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function addToCache(_x) {
        return _addToCache.apply(this, arguments);
      }

      return addToCache;
    }()
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var pathname = this.props.location.pathname;
      var isSearch = pathname === '/search.html';
      mountedInstances.add(this);

      if (!isSearch) {
        this.getRouteComponent(pathname);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var props = this.props,
          state = this.state;
      var pathname = props.location.pathname;
      var isKnown = state.componentMap.has(pathname);
      var isSearch = pathname === '/search.html'; // `NOTFOUND` component needs a unique id
      // currently it is set to -1

      var isNotFoundComponent = isKnown ? state.componentMap.get(pathname).id === -1 : false;
      var shouldReloadRoute = isNotFoundComponent && navigator.onLine;

      if (!isKnown && !isSearch || shouldReloadRoute) {
        this.getRouteComponent();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      mountedInstances.delete(this);
    }
  }, {
    key: "getRouteComponent",
    value: function () {
      var _getRouteComponent = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee2() {
        var _this$props, apiBase, pathname, fetchRoot, resolvedRoute, type, id, RootComponent, message, symbol;

        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this$props = this.props, apiBase = _this$props.apiBase, pathname = _this$props.location.pathname; // Depending on the environment, the fetchRootComponent global can be
                // either an ES module with a `default` property or a plain CJS module.

                fetchRoot = 'default' in fetchRootComponent ? fetchRootComponent.default : fetchRootComponent;
                _context2.prev = 2;
                _context2.next = 5;
                return resolveUnknownRoute({
                  apiBase: apiBase,
                  route: pathname
                });

              case 5:
                resolvedRoute = _context2.sent;
                type = resolvedRoute.type, id = resolvedRoute.id; // if resolution and destructuring succeed but return no match
                // then we have a straightforward 404 Not Found

                if (!(!type || !id)) {
                  _context2.next = 9;
                  break;
                }

                throw new Error('404');

              case 9:
                _context2.next = 11;
                return fetchRoot(type);

              case 11:
                RootComponent = _context2.sent;
                // associate the matching RootComponent with this location
                this.setRouteComponent(pathname, RootComponent, {
                  id: id
                });
                _context2.next = 20;
                break;

              case 15:
                _context2.prev = 15;
                _context2.t0 = _context2["catch"](2);
                message = _context2.t0.message;
                symbol = message === '404' ? NotFound : InternalError; // we don't have a matching RootComponent, but we've checked for one
                // so associate the appropriate error case with this location

                this.setRouteComponent(pathname, symbol);

              case 20:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[2, 15]]);
      }));

      function getRouteComponent() {
        return _getRouteComponent.apply(this, arguments);
      }

      return getRouteComponent;
    }()
  }, {
    key: "setRouteComponent",
    value: function setRouteComponent(pathname, RootComponent, meta) {
      if (!mountedInstances.has(this)) {
        // avoid setState if component is not mounted for any reason
        return;
      }

      this.addToCache([pathname]).catch(function (e) {
        if (process.env.NODE_ENV === 'development') {
          console.warn("Could not add ".concat(pathname, " to cache:"), e);
        }
      });
      this.setState(function (_ref2) {
        var componentMap = _ref2.componentMap;
        return {
          componentMap: new Map(componentMap).set(pathname, _objectSpread({
            RootComponent: RootComponent
          }, meta)),
          errorState: {
            hasError: _typeof(RootComponent) === 'symbol',
            internalError: RootComponent === InternalError,
            notFound: RootComponent === NotFound
          }
        };
      });
    }
  }, {
    key: "renderChildren",
    value: function renderChildren(loading) {
      var props = this.props,
          state = this.state;
      var children = props.children;
      var errorState = state.errorState;
      return typeof children === 'function' ? children(_objectSpread({}, errorState, {
        loading: loading
      })) : null;
    }
  }, {
    key: "render",
    value: function render() {
      var props = this.props,
          state = this.state;
      var pathname = props.location.pathname;
      var componentMap = state.componentMap,
          errorState = state.errorState; // if we have no record of this pathname, we're still loading
      // and we have no RootComponent, so render children

      if (!componentMap.has(pathname)) {
        return this.renderChildren(true);
      } // if we're in an error state, we're not loading anymore
      // but we have no RootComponent, so render children


      if (errorState.hasError) {
        return this.renderChildren(false);
      } // otherwise we do have a RootComponent, so render it


      var _componentMap$get = componentMap.get(pathname),
          RootComponent = _componentMap$get.RootComponent,
          routeProps = _objectWithoutProperties(_componentMap$get, ["RootComponent"]);

      return React.createElement(RootComponent, _extends({}, routeProps, {
        key: pathname
      }));
    }
  }]);

  return MagentoRouteHandler;
}(Component);

_defineProperty(MagentoRouteHandler, "propTypes", {
  apiBase: string.isRequired,
  children: func,
  location: shape({
    pathname: string.isRequired
  }).isRequired
});

export { MagentoRouteHandler as default };
//# sourceMappingURL=MagentoRouteHandler.js.map