import React, { Fragment } from 'react';
import { shallow } from 'enzyme';
import Price from '../Price';
import IntlPolyfill from 'intl';

if (!global.Intl.NumberFormat.prototype.formatToParts) {
  global.Intl = IntlPolyfill;

  require('intl/locale-data/jsonp/en.js');
}

test('Renders a USD price', function () {
  var wrapper = shallow(React.createElement(Price, {
    value: 100.99,
    currencyCode: "USD"
  }));
  expect(wrapper.equals(React.createElement(Fragment, null, React.createElement("span", null, "$"), React.createElement("span", null, "100"), React.createElement("span", null, "."), React.createElement("span", null, "99")))).toBe(true);
});
test('Renders a EUR price', function () {
  var wrapper = shallow(React.createElement(Price, {
    value: 100.99,
    currencyCode: "EUR"
  }));
  expect(wrapper.equals(React.createElement(Fragment, null, React.createElement("span", null, "\u20AC"), React.createElement("span", null, "100"), React.createElement("span", null, "."), React.createElement("span", null, "99")))).toBe(true);
});
test('Allows custom classnames for each part', function () {
  var classes = {
    currency: 'curr',
    integer: 'int',
    decimal: 'dec',
    fraction: 'fract'
  };
  var wrapper = shallow(React.createElement(Price, {
    value: 88.81,
    currencyCode: "USD",
    classes: classes
  }));
  expect(wrapper.equals(React.createElement(Fragment, null, React.createElement("span", {
    className: "curr"
  }, "$"), React.createElement("span", {
    className: "int"
  }, "88"), React.createElement("span", {
    className: "dec"
  }, "."), React.createElement("span", {
    className: "fract"
  }, "81")))).toBe(true);
});
//# sourceMappingURL=Price.spec.js.map