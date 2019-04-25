import BrowserPersistence from '../simplePersistence';
var NAME = 'UnitTest';
var KEY = "M2_VENIA_BROWSER_PERSISTENCE__".concat(NAME);
var MOCK_VALUE = {
  unit: 'test'
};
var previousLocalStorage = window.localStorage;
var mockGetItem = jest.fn();
var mockRemoveItem = jest.fn();
var mockSetItem = jest.fn();
var localStorageMock = {
  getItem: mockGetItem,
  removeItem: mockRemoveItem,
  setItem: mockSetItem
};
var instance;
/**
 * The BrowserPersistence class enforces a particular shape for
 * the items it writes to storage.
 *
 * This helper function shapes an object to conform to the same structure.
 *
 * @param {object} with properties:
 *   @param {object} value - The value to write to storage.
 *   @param {Number} timeStored - The time at which this value was stored.
 *   @param {Number} ttl - The number of seconds that this item should live in storage.
 */

var shape = function shape(_ref) {
  var value = _ref.value,
      timeStored = _ref.timeStored,
      ttl = _ref.ttl;
  return JSON.stringify({
    value: JSON.stringify(value),
    timeStored: timeStored,
    ttl: ttl
  });
};

beforeAll(function () {
  // Mock window.localStorage so we can control it.
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
  });
  instance = new BrowserPersistence();
});
afterAll(function () {
  // Set window.localStorage back to what it was.
  Object.defineProperty(window, 'localStorage', {
    value: previousLocalStorage
  });
});
describe('getItem', function () {
  test('it returns the item if found', function () {
    // Test Setup: make sure it finds something.
    mockGetItem.mockImplementationOnce(function () {
      return shape({
        value: MOCK_VALUE
      });
    }); // Call the function.

    var result = instance.getItem(NAME); // Make assertions.

    expect(result).toEqual(MOCK_VALUE);
  });
  test('it returns undefined if not found', function () {
    // Call the function.
    var result = instance.getItem(NAME); // Make assertions.

    expect(result).toBeUndefined();
  });
  test('it removes the item and returns undefined if the item has expired', function () {
    // Test setup: an expired item.
    mockGetItem.mockImplementationOnce(function () {
      return shape({
        value: MOCK_VALUE,
        timeStored: 0,
        ttl: 1
      });
    }); // Call the function.

    var result = instance.getItem(NAME); // Make assertions.

    expect(mockRemoveItem).toHaveBeenCalledWith(KEY);
    expect(result).toBeUndefined();
  });
});
describe('setItem', function () {
  test('it puts the item in storage with the correct values', function () {
    // Call the function.
    var MOCK_TTL = 5;
    instance.setItem(NAME, MOCK_VALUE, MOCK_TTL); // Make assertions.

    expect(mockSetItem).toHaveBeenCalled();
    var storageKey = mockSetItem.mock.calls[0][0];
    expect(storageKey).toEqual(KEY);
    var storageItem = mockSetItem.mock.calls[0][1];
    var parsedItem = JSON.parse(storageItem);
    var parsedValue = JSON.parse(parsedItem.value);
    expect(parsedItem.timeStored).toBeTruthy();
    expect(parsedItem.ttl).toEqual(MOCK_TTL);
    expect(parsedValue).toEqual(MOCK_VALUE);
  });
});
describe('removeItem', function () {
  test('it returns undefined', function () {
    // Call the function.
    var result = instance.removeItem(NAME); // Make assertions.

    expect(result).toBeUndefined();
  });
  test('it removes the item from storage', function () {
    // Call the function.
    instance.removeItem(NAME); // Make assertions.

    expect(mockRemoveItem).toBeCalledWith(KEY);
  });
});
//# sourceMappingURL=simplePersistence.spec.js.map