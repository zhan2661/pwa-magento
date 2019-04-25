import React from 'react';
import ContainerChild from '..';
import { shallow } from 'enzyme';
test('Renders content from render prop', function () {
  var wrapper = shallow(React.createElement(ContainerChild, {
    id: "foo.bar",
    render: function render() {
      return React.createElement("div", null, "Hello World");
    },
    processed: true
  }));
  expect(wrapper.equals(React.createElement("div", null, "Hello World"))).toBe(true);
});
//# sourceMappingURL=ContainerChild.test.js.map