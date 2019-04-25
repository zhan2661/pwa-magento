function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

export default class M2ApiResponseError extends Error {
  constructor({
    method,
    resourceUrl,
    response,
    bodyText
  }, ...args) {
    let body = ``;

    try {
      const _JSON$parse = JSON.parse(bodyText),
            {
        message,
        trace
      } = _JSON$parse,
            rest = _objectWithoutProperties(_JSON$parse, ["message", "trace"]);

      if (message) {
        body += `Message:\n\n  ${message}\n`;
      }

      const addl = Object.entries(rest);

      if (addl.length > 0) {
        body += `\nAdditional info:\n\n${JSON.stringify(rest, null, 4)}\n\n`;
      }

      if (trace) {
        body += `Magento PHP stack trace: \n\n${trace}`;
      }

      body += '\n';
    } catch (e) {
      body = bodyText;
    }

    super(`${method} ${resourceUrl} responded ${response.status} ${response.statusText}: \n\n${body}`, ...args);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, M2ApiResponseError);
    }

    this.response = response;
    this.method = method;
    this.resourceUrl = resourceUrl;
  }

}
//# sourceMappingURL=M2ApiResponseError.js.map