"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var errorStyles = {
  background: '#ff1b1b',
  color: '#fff',
  fontWeight: 'bold',
  fontSize: '1em',
  fontFamily: 'sans-serif'
};

var MagentoExtensionBoundary =
/*#__PURE__*/
function (_React$Component) {
  _inherits(MagentoExtensionBoundary, _React$Component);

  function MagentoExtensionBoundary() {
    var _this;

    _classCallCheck(this, MagentoExtensionBoundary);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MagentoExtensionBoundary).call(this));
    _this.state = {
      hasError: false
    };
    return _this;
  }

  _createClass(MagentoExtensionBoundary, [{
    key: "componentDidCatch",
    value: function componentDidCatch() {
      var replacedID = this.props.replacedID;
      console.error('An error occurred within a part of the React component tree ' + 'created by a Magento Extension. Look for the component registered ' + "to replace the mid \"%c".concat(replacedID, "%c\" to debug further."));
      this.setState({
        hasError: true
      });
    }
  }, {
    key: "render",
    value: function render() {
      if (!this.state.hasError) {
        return this.props.children;
      }

      return _react.default.createElement("div", {
        style: errorStyles
      }, "An error occurred within a Magento Extension. See the browser's JavaScript console for further details.");
    }
  }]);

  return MagentoExtensionBoundary;
}(_react.default.Component);

exports.default = MagentoExtensionBoundary;
//# sourceMappingURL=index.js.map