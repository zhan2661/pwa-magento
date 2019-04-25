/**
 * Network requests that have not yet fulfilled, available for sharing with
 * other idempotent and safe M2ApiRequests for the same resource.
 * Resource matching is determined by a string composite [method, path, body].
 *
 * (M2ApiRequests know not to use this cache for create operations, except for
 * singleton create operations like createGuestCart, which have no body.)
 * @module MulticastCache
 */

/**
 * String keyed map of in-flight requests. When a request completes,
 * it should be removed.
 * @private
 */
var inflight = new Map();
/**
 * Reference cache to reduce repetitive requestToKey() calls.
 * @private
 */

var keyCache = new WeakMap();
/**
 *
 * @private
 * @param {M2ApiRequest} req
 * @return string Key for use in inflight cache.
 */

function requestToKey(req) {
  var key = keyCache.get(req);

  if (!key) {
    var _req$opts = req.opts,
        method = _req$opts.method,
        body = _req$opts.body;
    var parts = [method, req.resourceUrl];

    if (body) {
      parts.push(body);
    }

    key = parts.join('|||');
    keyCache.set(req, key);
  }

  return key;
}
/**
 * Returns any inflight request with the same key as the supplied request.
 * May be the same request itself!
 * @param {M2ApiRequest} req The request to match.
 * @return {M2ApiRequest} A request with the same method, body, and resourceUrl..
 */


export function match(req) {
  return inflight.get(requestToKey(req));
}
/**
 * Store a request for potential future multicast.
 * Adds a callback to delete the request when it has settled.
 * @param {M2ApiRequest} req The request to store.
 */

export function store(req) {
  inflight.set(requestToKey(req), req);
}
/**
 * Remove a request from cache if it exists there.
 * @param {M2ApiRequest} req
 */

export function remove(req) {
  if (match(req) === req) {
    inflight.delete(requestToKey(req));
  }
}
//# sourceMappingURL=MulticastCache.js.map