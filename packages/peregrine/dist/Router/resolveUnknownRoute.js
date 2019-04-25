import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";

/**
 * @description Given a route string, resolves with the "standard route", along
 * with the assigned Root Component (and its owning chunk) from the backend
 * @param {{ route: string, apiBase: string, __tmp_webpack_public_path__: string}} opts
 */
// Some M2.3.0 GraphQL node IDs are numbers and some are strings, so explicitly
// cast numbers if they appear to be numbers
var numRE = /^\d+$/;

var castDigitsToNum = function castDigitsToNum(str) {
  return typeof str === 'string' && numRE.test(str) ? Number(str) : str;
};

export default function resolveUnknownRoute(_x) {
  return _resolveUnknownRoute.apply(this, arguments);
}
/**
 * @description Checks if route is stored in localStorage, if not call `fetchRoute`
 * @param {{ route: string, apiBase: string}} opts
 * @returns {Promise<{type: "PRODUCT" | "CATEGORY" | "CMS_PAGE"}>}
 */

function _resolveUnknownRoute() {
  _resolveUnknownRoute = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(opts) {
    var route, apiBase, preloadAttrs, preloadScript, preload;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            route = opts.route, apiBase = opts.apiBase;

            if (resolveUnknownRoute.preloadDone) {
              _context.next = 16;
              break;
            }

            resolveUnknownRoute.preloadDone = true; // Templates may use the new style (data attributes on the body tag),
            // or the old style (handwritten JSON in a script element).
            // New style:

            preloadAttrs = document.body.dataset;

            if (!(preloadAttrs && preloadAttrs.modelType)) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", {
              type: preloadAttrs.modelType,
              id: castDigitsToNum(preloadAttrs.modelId)
            });

          case 6:
            // Old style:
            preloadScript = document.getElementById('url-resolver');

            if (!preloadScript) {
              _context.next = 16;
              break;
            }

            _context.prev = 8;
            preload = JSON.parse(preloadScript.textContent);
            return _context.abrupt("return", {
              type: preload.type,
              id: castDigitsToNum(preload.id)
            });

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](8);

            // istanbul ignore next: will never happen in test
            if (process.env.NODE_ENV === 'development') {
              console.error('Unable to read preload!', preloaded.textContent, _context.t0);
            }

          case 16:
            return _context.abrupt("return", remotelyResolveRoute({
              route: route,
              apiBase: apiBase
            }));

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[8, 13]]);
  }));
  return _resolveUnknownRoute.apply(this, arguments);
}

function remotelyResolveRoute(opts) {
  var urlResolve = localStorage.getItem('urlResolve');
  urlResolve = JSON.parse(urlResolve); // If it exists in localStorage, use that value
  // TODO: This can be handled by workbox once this issue is resolved in the
  // graphql repo: https://github.com/magento/graphql-ce/issues/229

  if (urlResolve && urlResolve[opts.route] || !navigator.onLine) {
    if (urlResolve && urlResolve[opts.route]) {
      return Promise.resolve(urlResolve[opts.route].data.urlResolver);
    } else {
      return Promise.resolve({
        type: 'NOTFOUND',
        id: -1
      });
    }
  } else {
    return fetchRoute(opts);
  }
}
/**
 * @description Calls the GraphQL API for results from the urlResolver query
 * @param {{ route: string, apiBase: string}} opts
 * @returns {Promise<{type: "PRODUCT" | "CATEGORY" | "CMS_PAGE"}>}
 */


function fetchRoute(opts) {
  var url = new URL('/graphql', opts.apiBase);
  return fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      query: "\n                {\n                    urlResolver(url: \"".concat(opts.route, "\") {\n                        type\n                        id\n                    }\n                }\n            ").trim()
    })
  }).then(function (res) {
    return res.json();
  }).then(function (res) {
    storeURLResolveResult(res, opts);
    return res.data.urlResolver;
  });
} // TODO: This can be handled by workbox once this issue is resolved in the
// graphql repo: https://github.com/magento/graphql-ce/issues/229


function storeURLResolveResult(res, opts) {
  var storedRoute = localStorage.getItem('urlResolve');
  var item = JSON.parse(storedRoute) || {};
  item[opts.route] = res;
  localStorage.setItem('urlResolve', JSON.stringify(item));
}
//# sourceMappingURL=resolveUnknownRoute.js.map