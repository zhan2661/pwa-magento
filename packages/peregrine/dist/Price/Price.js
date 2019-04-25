import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { PureComponent, Fragment } from 'react';
import { number, string, shape } from 'prop-types';
import patches from '../util/intlPatches';
/**
 * The **Price** component is used anywhere a price needs to be displayed.
 *
 * Formatting of prices and currency symbol selection is handled entirely by the ECMAScript Internationalization API available in modern browsers.
 *
 * A [polyfill][] is required for any JavaScript runtime that does not have [Intl.NumberFormat.prototype.formatToParts][].
 *
 * [polyfill]: https://www.npmjs.com/package/intl
 * [Intl.NumberFormat.prototype.formatToParts]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat/formatToParts
 */

var Price =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Price, _PureComponent);

  function Price() {
    _classCallCheck(this, Price);

    return _possibleConstructorReturn(this, _getPrototypeOf(Price).apply(this, arguments));
  }

  _createClass(Price, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          value = _this$props.value,
          currencyCode = _this$props.currencyCode,
          classes = _this$props.classes;
      var parts = patches.toParts.call(Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: currencyCode
      }), value);
      var children = parts.map(function (part, i) {
        var partClass = classes[part.type];
        var key = "".concat(i, "-").concat(part.value);
        return React.createElement("span", {
          key: key,
          className: partClass
        }, part.value);
      });
      return React.createElement(Fragment, null, children);
    }
  }]);

  return Price;
}(PureComponent);

_defineProperty(Price, "propTypes", {
  /**
   * The numeric price
   */
  value: number.isRequired,

  /**
   * A string with any of the currency code supported by Intl.NumberFormat
   */
  currencyCode: string.isRequired,

  /**
   * Class names to use when styling this component
   */
  classes: shape({
    currency: string,
    integer: string,
    decimal: string,
    fraction: string
  })
});

_defineProperty(Price, "defaultProps", {
  classes: {}
});

export { Price as default };
//# sourceMappingURL=Price.js.map