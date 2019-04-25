import patches from '../intlPatches';
import IntlPolyfill from 'intl';

var patchedFormatter = function patchedFormatter(cfg) {
  return new Proxy(Intl.NumberFormat(undefined, cfg), {
    get: function get(target, prop) {
      if (prop === 'formatToParts') {
        return false;
      }

      if (prop === 'resolvedOptions') {
        return function () {
          return target.resolvedOptions();
        };
      }

      return target[prop];
    }
  });
};

var standardFormatter = function standardFormatter(cfg) {
  return IntlPolyfill.NumberFormat(undefined, cfg);
};

require('intl/locale-data/jsonp/en.js');

var formatToPartsPatch = jest.spyOn(patches, 'formatToPartsPatch'); // IntlPolyfill behaves differently on Node 8 and Node 10, but only in small
// ways; namely, for an unrecognized currency, Node 10 inserts additional
// whitespace between the currency code and the first integer.
// This test shouldn't care about whitespace, so we pass everything through
// a filter function that strips those literals with whitespace.

var stripWhitespaceFromParts = function stripWhitespaceFromParts(parts) {
  return parts.filter(function (_ref) {
    var type = _ref.type,
        value = _ref.value;
    return !(type === 'literal' && /^\s*$/.test(value));
  });
};

var callToParts = function callToParts(formatter, config, num) {
  return stripWhitespaceFromParts(patches.toParts.call(formatter(config), num));
};

var compareOutputs = function compareOutputs(config, num) {
  return expect(callToParts(patchedFormatter, config, num)).toEqual(callToParts(standardFormatter, config, num));
};

test('does not use patch if native method exists', function () {
  callToParts(standardFormatter, {
    style: 'currency',
    currency: 'usd'
  }, 12000);
  expect(formatToPartsPatch).not.toHaveBeenCalled();
});
test('matches grouped USD format if currency unrecognized', function () {
  return compareOutputs({
    style: 'currency',
    currency: 'YTT'
  }, 12000);
});
test('matches USD format with no grouping', function () {
  return compareOutputs({
    style: 'currency',
    currency: 'USD',
    useGrouping: false
  }, 12000);
});
test('handles zero input', function () {
  return compareOutputs({
    style: 'currency',
    currency: 'USD'
  }, 0);
});
test('fixes and rounds decimals', function () {
  return compareOutputs({
    style: 'currency',
    currency: 'USD'
  }, 100.1285);
});
test('matches EUR format', function () {
  return compareOutputs({
    style: 'currency',
    currency: 'EUR',
    useGrouping: false
  }, 100000.99);
});
//# sourceMappingURL=intlPatches.spec.js.map