function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component, createContext } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { func, object, string } from 'prop-types';
export const {
  Consumer,
  Provider
} = createContext();
export default class MagentoRouter extends Component {
  render() {
    const {
      apiBase,
      children,
      routerProps,
      using: Router
    } = this.props;
    return React.createElement(Router, routerProps, React.createElement(Route, null, routeProps => React.createElement(Provider, {
      value: _objectSpread({
        apiBase
      }, routeProps)
    }, children)));
  }

}

_defineProperty(MagentoRouter, "propTypes", {
  apiBase: string.isRequired,
  routerProps: object,
  using: func // e.g., BrowserRouter, MemoryRouter

});

_defineProperty(MagentoRouter, "defaultProps", {
  routerProps: {},
  using: BrowserRouter
});
//# sourceMappingURL=Router.js.map