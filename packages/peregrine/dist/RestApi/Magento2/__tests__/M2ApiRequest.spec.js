import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import M2ApiRequest, { request } from '../M2ApiRequest';
var mockFetch = jest.fn();

var responseJson = function responseJson(req) {
  return req.getResponse().then(function (res) {
    return res.json();
  });
};

M2ApiRequest.prototype._transport = mockFetch;

function mockFetchReturned(_ref) {
  var _ref$status = _ref.status,
      status = _ref$status === void 0 ? 200 : _ref$status,
      _ref$statusText = _ref.statusText,
      statusText = _ref$statusText === void 0 ? 'OK' : _ref$statusText,
      text = _ref.text,
      json = _ref.json,
      _ref$delay = _ref.delay,
      delay = _ref$delay === void 0 ? 0 : _ref$delay;
  mockFetch.mockImplementationOnce(function (_, _ref2) {
    var signal = _ref2.signal;
    return new Promise(function (resolve, reject) {
      var body = json ? JSON.stringify(typeof json === 'function' ? json() : json) : typeof text === 'function' ? text() : text;
      var timeout = setTimeout(function () {
        return resolve(new Response(body, {
          status: status,
          statusText: statusText
        }));
      }, delay);

      signal.onabort = function () {
        clearTimeout(timeout);
        var e = new Error('Aborted');
        e.name = 'AbortError';
        reject(e);
      };
    });
  });
}

function mockFetchRejected(e) {
  var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref3$delay = _ref3.delay,
      delay = _ref3$delay === void 0 ? 0 : _ref3$delay;

  mockFetch.mockImplementationOnce(function () {
    return new Promise(function (_, reject) {
      return setTimeout(function () {
        return reject(e);
      }, delay);
    });
  });
}

afterEach(function () {
  mockFetch.mockReset();
});
test('runs fetch and returns a promise for response object',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee() {
  var req;
  return _regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          mockFetchReturned({
            json: {
              some: 'data'
            }
          });
          req = new M2ApiRequest('fake-path');
          req.run();
          expect(mockFetch).toHaveBeenCalledTimes(1);
          expect(mockFetch).toHaveBeenCalledWith('fake-path', expect.objectContaining({
            headers: expect.any(Headers),
            credentials: 'include',
            signal: expect.any(AbortSignal)
          }));
          _context.next = 7;
          return expect(responseJson(req)).resolves.toEqual({
            some: 'data'
          });

        case 7:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));
test('returns a rejected promise when http response is not 2xx',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee2() {
  var req;
  return _regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          mockFetchReturned({
            status: 500,
            statusText: 'Server Yuck',
            text: JSON.stringify({
              error: {
                message: 'That sucked',
                stack: 'php\nstack\ntrace'
              }
            })
          });
          req = new M2ApiRequest('fake-path');
          req.run();
          _context2.next = 5;
          return expect(req.getResponse()).rejects.toThrowError('GET fake-path responded 500 Server Yuck');

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2);
})));
test('throws an error if .run() has not been called', function () {
  var req = new M2ApiRequest('somewhere');
  expect(function () {
    return req.getResponse();
  }).toThrowErrorMatchingSnapshot();
});
test('throws an error if underlying transport throws an error',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee3() {
  var req;
  return _regeneratorRuntime.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          mockFetchRejected(new Error('Something weird happened'));
          req = new M2ApiRequest('somewhere');
          req.run();
          _context3.next = 5;
          return expect(req.getResponse()).rejects.toThrow('Something weird happened');

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  }, _callee3);
})));
test('can be aborted',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee4() {
  var req;
  return _regeneratorRuntime.wrap(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          mockFetchReturned({
            json: 'never gets to you',
            delay: 500
          });
          req = new M2ApiRequest('somewhere', {
            method: 'POST',
            body: 'something'
          });
          req.run();
          req.abortRequest();
          _context4.next = 6;
          return expect(req.getResponse()).rejects.toThrowErrorMatchingSnapshot();

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  }, _callee4);
})));
test('multicasts a request that appears safe and idempotent',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee5() {
  var uniqueId, req, subsequentReq, result;
  return _regeneratorRuntime.wrap(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          jest.useFakeTimers();
          uniqueId = Math.random().toString(16);
          mockFetchReturned({
            json: uniqueId,
            delay: 1000
          });
          req = new M2ApiRequest('some-empty-post', {
            method: 'POST'
          });
          req.run();
          subsequentReq = new M2ApiRequest('some-empty-post', {
            method: 'POST'
          });
          subsequentReq.run();
          jest.runAllTimers();
          expect(mockFetch).toHaveBeenCalledTimes(1);
          _context5.next = 11;
          return responseJson(req);

        case 11:
          result = _context5.sent;
          expect(result).toEqual(uniqueId);
          _context5.t0 = expect(result);
          _context5.next = 16;
          return responseJson(subsequentReq);

        case 16:
          _context5.t1 = _context5.sent;

          _context5.t0.toEqual.call(_context5.t0, _context5.t1);

          jest.useRealTimers();

        case 19:
        case "end":
          return _context5.stop();
      }
    }
  }, _callee5);
})));
test('does not multicast a settled request',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee6() {
  var req, subsequentReq;
  return _regeneratorRuntime.wrap(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          jest.useFakeTimers();
          mockFetchReturned({
            json: 'response1',
            delay: 100
          });
          mockFetchReturned({
            json: 'response2',
            delay: 1000
          });
          req = new M2ApiRequest('some-cacheable-operation');
          req.run();
          jest.advanceTimersByTime(500);
          _context6.t0 = expect;
          _context6.next = 9;
          return responseJson(req);

        case 9:
          _context6.t1 = _context6.sent;
          (0, _context6.t0)(_context6.t1).toEqual('response1');
          subsequentReq = new M2ApiRequest('some-cacheable-operation');
          subsequentReq.run();
          expect(mockFetch).toHaveBeenCalledTimes(2);
          jest.runAllTimers();
          _context6.t2 = expect;
          _context6.next = 18;
          return responseJson(subsequentReq);

        case 18:
          _context6.t3 = _context6.sent;
          (0, _context6.t2)(_context6.t3).toEqual('response2');
          jest.useRealTimers();

        case 21:
        case "end":
          return _context6.stop();
      }
    }
  }, _callee6);
})));
test('does not multicast a request that is clearly not idempotent/safe',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee7() {
  var req, subsequentReq;
  return _regeneratorRuntime.wrap(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          jest.useFakeTimers();
          mockFetchReturned({
            json: 'response1',
            delay: 1000
          });
          mockFetchReturned({
            json: 'response2',
            delay: 200
          });
          req = new M2ApiRequest('some-create-operation', {
            method: 'POST',
            body: 'do stuff'
          });
          req.run();
          subsequentReq = new M2ApiRequest('some-create-operation', {
            method: 'POST',
            body: 'do stuff'
          });
          subsequentReq.run();
          expect(mockFetch).toHaveBeenCalledTimes(2);
          jest.advanceTimersByTime(500);
          _context7.t0 = expect;
          _context7.next = 12;
          return responseJson(subsequentReq);

        case 12:
          _context7.t1 = _context7.sent;
          (0, _context7.t0)(_context7.t1).toEqual('response2');
          jest.runAllTimers();
          _context7.t2 = expect;
          _context7.next = 18;
          return responseJson(req);

        case 18:
          _context7.t3 = _context7.sent;
          (0, _context7.t2)(_context7.t3).toEqual('response1');
          jest.useRealTimers();

        case 21:
        case "end":
          return _context7.stop();
      }
    }
  }, _callee7);
})));
test('multicasts an unsafe request if `multicast` option is true',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee8() {
  var req, subsequentReq, subsequentReqResolved;
  return _regeneratorRuntime.wrap(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          jest.useFakeTimers();
          mockFetchReturned({
            json: 'response1',
            delay: 1000
          });
          mockFetchReturned({
            json: 'response2',
            delay: 200
          });
          req = new M2ApiRequest('some-create-operation', {
            method: 'POST',
            body: 'do stuff',
            multicast: true
          });
          req.run();
          subsequentReq = new M2ApiRequest('some-create-operation', {
            method: 'POST',
            body: 'do stuff',
            multicast: true
          });
          subsequentReq.run();
          expect(mockFetch).toHaveBeenCalledTimes(1); // observe that the second mock was set to resolve faster, but multicast
          // reuses the first mock

          subsequentReqResolved = false;
          subsequentReq.getResponse().then(function () {
            subsequentReqResolved = true;
          });
          jest.advanceTimersByTime(500);
          expect(subsequentReqResolved).toBe(false);
          jest.runAllTimers();
          _context8.t0 = expect;
          _context8.next = 16;
          return responseJson(req);

        case 16:
          _context8.t1 = _context8.sent;
          (0, _context8.t0)(_context8.t1).toEqual('response1');
          _context8.t2 = expect;
          _context8.next = 21;
          return responseJson(subsequentReq);

        case 21:
          _context8.t3 = _context8.sent;
          (0, _context8.t2)(_context8.t3).toEqual('response1');
          expect(subsequentReqResolved).toBe(true);
          jest.useRealTimers();

        case 25:
        case "end":
          return _context8.stop();
      }
    }
  }, _callee8);
})));
test('does not multicast a safe request if `multicast` option is false',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee9() {
  var req, subsequentReq;
  return _regeneratorRuntime.wrap(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          mockFetchReturned({
            json: 'updated1'
          });
          mockFetchReturned({
            json: 'updated2'
          });
          req = new M2ApiRequest('resource-to-update', {
            method: 'PUT',
            body: 'new value',
            multicast: false
          });
          req.run();
          subsequentReq = new M2ApiRequest('resource-to-update', {
            method: 'PUT',
            body: 'new value',
            multicast: false
          });
          subsequentReq.run();
          expect(mockFetch).toHaveBeenCalledTimes(2);
          _context9.t0 = expect;
          _context9.next = 10;
          return responseJson(req);

        case 10:
          _context9.t1 = _context9.sent;
          (0, _context9.t0)(_context9.t1).toEqual('updated1');
          _context9.t2 = expect;
          _context9.next = 15;
          return responseJson(subsequentReq);

        case 15:
          _context9.t3 = _context9.sent;
          (0, _context9.t2)(_context9.t3).toEqual('updated2');

        case 17:
        case "end":
          return _context9.stop();
      }
    }
  }, _callee9);
})));
test('if cache is set to reload or no-store, aborts and replaces a matching multicast',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee10() {
  var req, rolls;
  return _regeneratorRuntime.wrap(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          mockFetchReturned({
            json: {
              shouldBeOverridden: true
            },
            delay: 50
          });
          mockFetchReturned({
            json: {
              shouldOverride: true
            },
            delay: 100
          });
          req = new M2ApiRequest('slow-resource');
          req.run();
          rolls = new M2ApiRequest('slow-resource', {
            cache: 'no-store'
          });
          rolls.run();
          _context10.next = 8;
          return expect(responseJson(rolls)).resolves.toHaveProperty('shouldOverride');

        case 8:
          _context10.next = 10;
          return expect(responseJson(req)).resolves.toHaveProperty('shouldOverride');

        case 10:
        case "end":
          return _context10.stop();
      }
    }
  }, _callee10);
})));
test('multicasts can be manually aborted',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee11() {
  var req;
  return _regeneratorRuntime.wrap(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          mockFetchReturned({
            json: 'never gets to you',
            delay: 500
          });
          req = new M2ApiRequest('somewhere');
          req.run();
          req.abortRequest();
          _context11.next = 6;
          return expect(responseJson(req)).rejects.toThrowErrorMatchingSnapshot();

        case 6:
        case "end":
          return _context11.stop();
      }
    }
  }, _callee11);
})));
test('headers can be updated with object literal',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee12() {
  return _regeneratorRuntime.wrap(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          mockFetchReturned({
            json: {
              some: 'otherdata'
            }
          });
          _context12.next = 3;
          return expect(request('somewhere', {
            cache: 'reload',
            headers: {
              'If-Modified-Since': new Date().toISOString()
            }
          })).resolves.toEqual({
            some: 'otherdata'
          });

        case 3:
        case "end":
          return _context12.stop();
      }
    }
  }, _callee12);
})));
test('headers can be updated with Header instance',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee13() {
  return _regeneratorRuntime.wrap(function _callee13$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          mockFetchReturned({
            json: {
              some: 'otherdata'
            }
          });
          _context13.next = 3;
          return expect(request('somewhere', {
            cache: 'reload',
            headers: new Headers({
              Accept: 'text/plain'
            })
          })).resolves.toEqual({
            some: 'otherdata'
          });

        case 3:
        case "end":
          return _context13.stop();
      }
    }
  }, _callee13);
})));
test('convenience method creates, runs, and promises a request',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee14() {
  return _regeneratorRuntime.wrap(function _callee14$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          mockFetchReturned({
            json: {
              some: 'otherdata'
            }
          });
          _context14.next = 3;
          return expect(request('somewhere', {
            cache: 'reload'
          })).resolves.toEqual({
            some: 'otherdata'
          });

        case 3:
        case "end":
          return _context14.stop();
      }
    }
  }, _callee14);
})));
test('convenience method returns a response if parseJSON is false',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee15() {
  var response;
  return _regeneratorRuntime.wrap(function _callee15$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          mockFetchReturned({
            json: {
              some: 'otherdata'
            }
          });
          _context15.next = 3;
          return request('somewhere', {
            parseJSON: false
          });

        case 3:
          response = _context15.sent;
          expect(response).toBeInstanceOf(Response);
          _context15.next = 7;
          return expect(response.json()).resolves.toEqual({
            some: 'otherdata'
          });

        case 7:
        case "end":
          return _context15.stop();
      }
    }
  }, _callee15);
})));
//# sourceMappingURL=M2ApiRequest.spec.js.map