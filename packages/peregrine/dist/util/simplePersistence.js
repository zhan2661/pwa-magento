import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";

/**
 * Persistence layer with expiration based on localStorage.
 */
var NamespacedLocalStorage =
/*#__PURE__*/
function () {
  function NamespacedLocalStorage(localStorage, key) {
    _classCallCheck(this, NamespacedLocalStorage);

    this.localStorage = localStorage;
    this.key = key;
  }

  _createClass(NamespacedLocalStorage, [{
    key: "_makeKey",
    value: function _makeKey(key) {
      return "".concat(this.key, "__").concat(key);
    }
  }, {
    key: "getItem",
    value: function getItem(name) {
      return this.localStorage.getItem(this._makeKey(name));
    }
  }, {
    key: "setItem",
    value: function setItem(name, value) {
      return this.localStorage.setItem(this._makeKey(name), value);
    }
  }, {
    key: "removeItem",
    value: function removeItem(name) {
      return this.localStorage.removeItem(this._makeKey(name));
    }
  }]);

  return NamespacedLocalStorage;
}();

var BrowserPersistence =
/*#__PURE__*/
function () {
  function BrowserPersistence() {
    _classCallCheck(this, BrowserPersistence);

    this.storage = new NamespacedLocalStorage(window.localStorage, this.constructor.KEY || BrowserPersistence.KEY);
  }

  _createClass(BrowserPersistence, [{
    key: "getItem",
    value: function getItem(name) {
      var now = Date.now();
      var item = this.storage.getItem(name);

      if (!item) {
        return undefined;
      }

      var _JSON$parse = JSON.parse(item),
          value = _JSON$parse.value,
          ttl = _JSON$parse.ttl,
          timeStored = _JSON$parse.timeStored;

      if (ttl && now - timeStored > ttl * 1000) {
        this.storage.removeItem(name);
        return undefined;
      }

      return JSON.parse(value);
    }
  }, {
    key: "setItem",
    value: function setItem(name, value, ttl) {
      var timeStored = Date.now();
      this.storage.setItem(name, JSON.stringify({
        value: JSON.stringify(value),
        timeStored: timeStored,
        ttl: ttl
      }));
    }
  }, {
    key: "removeItem",
    value: function removeItem(name) {
      this.storage.removeItem(name);
    }
  }]);

  return BrowserPersistence;
}();

_defineProperty(BrowserPersistence, "KEY", 'M2_VENIA_BROWSER_PERSISTENCE');

export { BrowserPersistence as default };
//# sourceMappingURL=simplePersistence.js.map