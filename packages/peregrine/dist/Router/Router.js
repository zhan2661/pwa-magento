import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component, createContext } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { func, object, string } from 'prop-types';

var _createContext = createContext(),
    Consumer = _createContext.Consumer,
    Provider = _createContext.Provider;

export { Consumer, Provider };

var MagentoRouter =
/*#__PURE__*/
function (_Component) {
  _inherits(MagentoRouter, _Component);

  function MagentoRouter() {
    _classCallCheck(this, MagentoRouter);

    return _possibleConstructorReturn(this, _getPrototypeOf(MagentoRouter).apply(this, arguments));
  }

  _createClass(MagentoRouter, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          apiBase = _this$props.apiBase,
          children = _this$props.children,
          routerProps = _this$props.routerProps,
          Router = _this$props.using;
      return React.createElement(Router, routerProps, React.createElement(Route, null, function (routeProps) {
        return React.createElement(Provider, {
          value: _objectSpread({
            apiBase: apiBase
          }, routeProps)
        }, children);
      }));
    }
  }]);

  return MagentoRouter;
}(Component);

_defineProperty(MagentoRouter, "propTypes", {
  apiBase: string.isRequired,
  routerProps: object,
  using: func // e.g., BrowserRouter, MemoryRouter

});

_defineProperty(MagentoRouter, "defaultProps", {
  routerProps: {},
  using: BrowserRouter
});

export { MagentoRouter as default };
//# sourceMappingURL=Router.js.map