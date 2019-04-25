import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _wrapNativeSuper from "@babel/runtime/helpers/wrapNativeSuper";

var M2ApiResponseError =
/*#__PURE__*/
function (_Error) {
  _inherits(M2ApiResponseError, _Error);

  function M2ApiResponseError(_ref) {
    var _getPrototypeOf2;

    var _this;

    var method = _ref.method,
        resourceUrl = _ref.resourceUrl,
        response = _ref.response,
        bodyText = _ref.bodyText;

    _classCallCheck(this, M2ApiResponseError);

    var body = "";

    try {
      var _JSON$parse = JSON.parse(bodyText),
          message = _JSON$parse.message,
          trace = _JSON$parse.trace,
          rest = _objectWithoutProperties(_JSON$parse, ["message", "trace"]);

      if (message) {
        body += "Message:\n\n  ".concat(message, "\n");
      }

      var addl = Object.entries(rest);

      if (addl.length > 0) {
        body += "\nAdditional info:\n\n".concat(JSON.stringify(rest, null, 4), "\n\n");
      }

      if (trace) {
        body += "Magento PHP stack trace: \n\n".concat(trace);
      }

      body += '\n';
    } catch (e) {
      body = bodyText;
    }

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(M2ApiResponseError)).call.apply(_getPrototypeOf2, [this, "".concat(method, " ").concat(resourceUrl, " responded ").concat(response.status, " ").concat(response.statusText, ": \n\n").concat(body)].concat(args)));

    if (Error.captureStackTrace) {
      Error.captureStackTrace(_assertThisInitialized(_this), M2ApiResponseError);
    }

    _this.response = response;
    _this.method = method;
    _this.resourceUrl = resourceUrl;
    return _this;
  }

  return M2ApiResponseError;
}(_wrapNativeSuper(Error));

export { M2ApiResponseError as default };
//# sourceMappingURL=M2ApiResponseError.js.map