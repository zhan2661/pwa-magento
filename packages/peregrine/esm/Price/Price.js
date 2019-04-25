function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent, Fragment } from 'react';
import { number, string, shape } from 'prop-types';
import patches from "../util/intlPatches";
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

export default class Price extends PureComponent {
  render() {
    const {
      value,
      currencyCode,
      classes
    } = this.props;
    const parts = patches.toParts.call(Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currencyCode
    }), value);
    const children = parts.map((part, i) => {
      const partClass = classes[part.type];
      const key = `${i}-${part.value}`;
      return React.createElement("span", {
        key: key,
        className: partClass
      }, part.value);
    });
    return React.createElement(Fragment, null, children);
  }

}

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
//# sourceMappingURL=Price.js.map