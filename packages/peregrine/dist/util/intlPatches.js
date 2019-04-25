import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectSpread from "@babel/runtime/helpers/objectSpread";

/**
 * A [ponyfill](https://github.com/sindresorhus/ponyfill) is an opt-in polyfill,
 * which replaces missing builtins on older or non-compliant platforms, but
 * without monkey-patching the native API.
 *
 * Many browsers do not yet support Intl.NumberFormat.prototype.formatToParts,
 * which is tracked here: https://github.com/tc39/proposal-intl-formatToParts
 *
 * The polyfill available in that repository covers many edge cases, but it's
 * more functionality than we need at this stage, it's not distributed over
 * NPM, and it's 18kb. The below
 * [ponyfill](https://github.com/sindresorhus/ponyfill) is not fully compliant,
 * but it'll do for now.
 *
 * TODO: Replace with a formally maintained, but small-enough, ponyfill.
 */
var intlFormats = {
  USD: {
    symbol: '$',
    decimal: '.',
    groupDelim: ','
  },
  GBP: {
    symbol: '£',
    decimal: '.',
    groupDelim: ','
  },
  EUR: {
    symbol: '€',
    decimal: '.',
    groupDelim: ','
  }
};
var IntlPatches = {
  formatToPartsPatch: function formatToPartsPatch(_ref, num) {
    var currency = _ref.currency,
        maximumFractionDigits = _ref.maximumFractionDigits,
        useGrouping = _ref.useGrouping;

    var format = intlFormats[currency] || _objectSpread({}, intlFormats.USD, {
      symbol: currency
    });

    var symbol = format.symbol,
        decimal = format.decimal,
        groupDelim = format.groupDelim;

    var _num$toFixed$match = num.toFixed(maximumFractionDigits).match(/\d+/g),
        _num$toFixed$match2 = _slicedToArray(_num$toFixed$match, 2),
        integer = _num$toFixed$match2[0],
        fraction = _num$toFixed$match2[1];

    var parts = [{
      type: 'currency',
      value: symbol
    }];

    if (useGrouping !== false) {
      var intParts = [];
      var firstGroupLength = integer.length % 3;

      if (firstGroupLength > 0) {
        intParts.push(JSON.stringify({
          type: 'integer',
          value: integer.slice(0, firstGroupLength)
        }));
        integer = integer.slice(firstGroupLength);
      }

      var groups = integer.match(/\d{3}/g);

      if (groups) {
        intParts.push.apply(intParts, _toConsumableArray(groups.map(function (intPart) {
          return JSON.stringify({
            type: 'integer',
            value: intPart
          });
        })));
      }

      var groupDelimJSON = ',' + JSON.stringify({
        type: 'group',
        value: groupDelim
      }) + ',';
      var intAndGroupParts = JSON.parse("[".concat(intParts.join(groupDelimJSON), "]"));
      parts.push.apply(parts, _toConsumableArray(intAndGroupParts));
    } else {
      parts.push({
        type: 'integer',
        value: integer
      });
    }

    return parts.concat([{
      type: 'decimal',
      value: decimal
    }, {
      type: 'fraction',
      value: fraction
    }]);
  },
  toParts: function toParts(num) {
    return this.formatToParts ? this.formatToParts(num) : IntlPatches.formatToPartsPatch(this.resolvedOptions(), num);
  }
};
export default IntlPatches;
//# sourceMappingURL=intlPatches.js.map