import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import resolveUnknownRoute from '../resolveUnknownRoute';

var urlResolverRes = function urlResolverRes(type, id) {
  return JSON.stringify({
    data: {
      urlResolver: {
        type: type,
        id: id
      }
    }
  });
};

var NotFoundManifest = {
  NotFound: {
    rootChunkID: -1,
    rootModuleID: 100,
    pageTypes: ['NOTFOUND']
  }
};

var mockManifest = _objectSpread({
  Category: {
    rootChunkID: 2,
    rootModuleID: 100,
    pageTypes: ['CATEGORY']
  },
  Product: {
    rootChunkID: 1,
    rootModuleID: 99,
    pageTypes: ['PRODUCT']
  }
}, NotFoundManifest);

var cachedResponse = JSON.stringify({
  'foo-bar.html': _objectSpread({}, JSON.parse(urlResolverRes('PRODUCT')))
});

var isOnline = function isOnline(_value) {
  return {
    get: function get() {
      return _value;
    },
    set: function set(v) {
      return _value = v;
    }
  };
};

Object.defineProperty(navigator, 'onLine', isOnline(true));

function clearLocalStorage(item) {
  localStorage.setItem(item, null);
}

beforeEach(function () {
  navigator.onLine = true;
  clearLocalStorage('urlResolve');
  document.body.innerHTML = '';
  resolveUnknownRoute.preloadDone = false;
  fetch.resetMocks();
});
test('Preload path: resolves directly from preload attributes',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee() {
  var res;
  return _regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          document.body.setAttribute('data-model-type', 'CATEGORY');
          document.body.setAttribute('data-model-id', '45');
          _context.next = 4;
          return resolveUnknownRoute({
            route: 'foo-bar.html',
            apiBase: 'https://example.com'
          });

        case 4:
          res = _context.sent;
          expect(res).toMatchObject({
            type: 'CATEGORY',
            id: 45
          });
          document.body.removeAttribute('data-model-type');
          document.body.removeAttribute('data-model-id');

        case 8:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));
test('Preload path: resolves directly from preload element',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee2() {
  var res;
  return _regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          document.body.innerHTML = '<script type="application/json" id="url-resolver">{ "type": "PRODUCT", "id": "VA-123" }</script>';
          _context2.next = 3;
          return resolveUnknownRoute({
            route: 'foo-bar.html',
            apiBase: 'https://example.com'
          });

        case 3:
          res = _context2.sent;
          expect(res).toMatchObject({
            type: 'PRODUCT',
            id: 'VA-123'
          });

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2);
})));
test('returns NOTFOUND when offline and requested content is not in cache ',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee3() {
  var res;
  return _regeneratorRuntime.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          navigator.onLine = false;
          fetch.mockResponseOnce(JSON.stringify(mockManifest));
          _context3.next = 4;
          return resolveUnknownRoute({
            route: 'foo-bar.html',
            apiBase: 'https://store.com',
            __tmp_webpack_public_path__: 'https://dev-server.com/pub'
          });

        case 4:
          res = _context3.sent;
          expect(res).toHaveProperty('id', NotFoundManifest.NotFound.rootChunkID);

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  }, _callee3);
})));
test('stores response of urlResolver in cache',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee4() {
  var url;
  return _regeneratorRuntime.wrap(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          fetch.mockResponseOnce(urlResolverRes('PRODUCT'));
          fetch.mockResponseOnce(JSON.stringify(mockManifest));
          url = 'foo-bar.html';
          _context4.next = 5;
          return resolveUnknownRoute({
            route: url,
            apiBase: 'https://store.com',
            __tmp_webpack_public_path__: 'https://dev-server.com/pub'
          });

        case 5:
          expect(localStorage.getItem('urlResolve')).not.toBeNull();

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  }, _callee4);
})));
test('does not call fetchRoute when response is cached',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee5() {
  return _regeneratorRuntime.wrap(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          localStorage.setItem('urlResolve', cachedResponse);
          fetch.mockResponseOnce(JSON.stringify(mockManifest));
          _context5.next = 4;
          return resolveUnknownRoute({
            route: 'foo-bar.html',
            apiBase: 'https://store.com',
            __tmp_webpack_public_path__: 'https://dev-server.com/pub'
          });

        case 4:
          expect(fetch).toHaveBeenCalledTimes(0);

        case 5:
        case "end":
          return _context5.stop();
      }
    }
  }, _callee5);
})));
test('calls fetchRoute when response is not cached',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee6() {
  return _regeneratorRuntime.wrap(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          fetch.mockResponseOnce(urlResolverRes('PRODUCT'));
          fetch.mockResponseOnce(JSON.stringify(mockManifest));
          _context6.next = 4;
          return resolveUnknownRoute({
            route: 'foo-bar.html',
            apiBase: 'https://store.com',
            __tmp_webpack_public_path__: 'https://dev-server.com/pub'
          });

        case 4:
          expect(fetch).toHaveBeenCalledTimes(1);

        case 5:
        case "end":
          return _context6.stop();
      }
    }
  }, _callee6);
})));
test('urlResolver path: resolve using fetch to GraphQL after one preload',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee7() {
  var preloadRes, res;
  return _regeneratorRuntime.wrap(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          fetch.mockResponseOnce(urlResolverRes('PRODUCT', 'VA-11'));
          document.body.innerHTML = '<script type="application/json" id="url-resolver">{ "type": "CMS_PAGE", "id": "1" }</script>';
          _context7.next = 4;
          return resolveUnknownRoute({
            route: 'foo-bar.html',
            apiBase: 'https://store.com'
          });

        case 4:
          preloadRes = _context7.sent;
          expect(preloadRes).toMatchObject({
            type: 'CMS_PAGE',
            id: 1
          });
          expect(fetch).not.toHaveBeenCalled();
          _context7.next = 9;
          return resolveUnknownRoute({
            route: 'foo-bar.html',
            apiBase: 'https://store.com'
          });

        case 9:
          res = _context7.sent;
          expect(res).toMatchObject({
            type: 'PRODUCT',
            id: 'VA-11'
          });
          expect(fetch).toHaveBeenCalledTimes(1);

        case 12:
        case "end":
          return _context7.stop();
      }
    }
  }, _callee7);
})));
test('Preload path: skips if preload element not found',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee8() {
  var res;
  return _regeneratorRuntime.wrap(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          fetch.mockResponseOnce(urlResolverRes('CATEGORY', 2));
          _context8.next = 3;
          return resolveUnknownRoute({
            route: 'foo-bar.html',
            apiBase: 'https://store.com'
          });

        case 3:
          res = _context8.sent;
          expect(res).toMatchObject({
            type: 'CATEGORY',
            id: 2
          });

        case 5:
        case "end":
          return _context8.stop();
      }
    }
  }, _callee8);
})));
test('Preload path: skips if preload element unparseable',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee9() {
  var res;
  return _regeneratorRuntime.wrap(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          document.body.innerHTML = '<script type="application/json" id="url-resolver"> "type": "CMS_PAGE", "id": "1" }</script>';
          fetch.mockResponseOnce(urlResolverRes('CATEGORY', 2));
          _context9.next = 4;
          return resolveUnknownRoute({
            route: 'foo-bar.html',
            apiBase: 'https://store.com'
          });

        case 4:
          res = _context9.sent;
          expect(res).toMatchObject({
            type: 'CATEGORY',
            id: 2
          });

        case 6:
        case "end":
          return _context9.stop();
      }
    }
  }, _callee9);
})));
test('Preload path: casts numbers to number',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee10() {
  var res;
  return _regeneratorRuntime.wrap(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          document.body.innerHTML = '<script type="application/json" id="url-resolver">{ "type": "CMS_PAGE", "id": "1" }</script>';
          _context10.next = 3;
          return resolveUnknownRoute({
            route: 'foo-bar.html',
            apiBase: 'https://store.com'
          });

        case 3:
          res = _context10.sent;
          expect(res).toMatchObject({
            type: 'CMS_PAGE',
            id: 1
          });

        case 5:
        case "end":
          return _context10.stop();
      }
    }
  }, _callee10);
})));
//# sourceMappingURL=resolveUnknownRoute.test.js.map