import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { Component } from 'react';
import { func, string } from 'prop-types';

var ContainerChild =
/*#__PURE__*/
function (_Component) {
  _inherits(ContainerChild, _Component);

  function ContainerChild() {
    _classCallCheck(this, ContainerChild);

    return _possibleConstructorReturn(this, _getPrototypeOf(ContainerChild).apply(this, arguments));
  }

  _createClass(ContainerChild, [{
    key: "render",
    value: function render() {
      return this.props.render();
    }
  }]);

  return ContainerChild;
}(Component);

_defineProperty(ContainerChild, "propTypes", {
  id: string.isRequired,
  render: func.isRequired
});

export { ContainerChild as default };
//# sourceMappingURL=ContainerChild.js.map