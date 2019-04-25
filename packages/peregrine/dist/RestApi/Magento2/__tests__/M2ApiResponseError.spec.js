import M2ApiResponseError from '../M2ApiResponseError';
test('pretty prints a JSON response', function () {
  var _ref = new M2ApiResponseError({
    method: 'GET',
    resourceUrl: 'bad-path',
    response: {
      status: 500,
      statusText: 'Just the worst'
    },
    bodyText: JSON.stringify({
      message: 'Server error 1',
      trace: 'Server error 1 trace'
    })
  }),
      message = _ref.message;

  expect(message).toMatchSnapshot();
});
test('handles random extra properties', function () {
  var _ref2 = new M2ApiResponseError({
    method: 'GET',
    resourceUrl: 'bad-path',
    response: {
      status: 500,
      statusText: 'Just the worst'
    },
    bodyText: JSON.stringify({
      message: 'Server error 1',
      trace: 'Server error 1 trace',
      randomProp: 12
    })
  }),
      message = _ref2.message;

  expect(message).toMatchSnapshot();
});
test('recovers when error properties cannot be parsed', function () {
  var _ref3 = new M2ApiResponseError({
    method: 'GET',
    resourceUrl: 'bad-path',
    response: {
      status: 500,
      statusText: 'Just the worst'
    },
    bodyText: '<p>I am unparseable</p>'
  }),
      message = _ref3.message;

  expect(message).toMatchSnapshot();
});
test('does not call Error.captureStackTrace if unavailable', function () {
  var capture = Error.captureStackTrace;
  Error.captureStackTrace = null;
  new M2ApiResponseError({
    method: 'GET',
    resourceUrl: 'bad-path',
    response: {
      status: 500,
      statusText: 'Just the worst'
    },
    bodyText: '<p>I am unparseable</p>'
  });
  Error.captureStackTrace = capture;
});
//# sourceMappingURL=M2ApiResponseError.spec.js.map