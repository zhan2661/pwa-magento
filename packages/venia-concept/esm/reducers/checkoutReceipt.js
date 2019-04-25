function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { handleActions } from 'redux-actions';
import actions from "../actions/checkoutReceipt";
const initialState = {
  order: {}
};
export default handleActions({
  [actions.setOrderInformation]: (state, {
    payload
  }) => _objectSpread({}, state, {
    order: payload
  }),
  [actions.reset]: () => initialState
}, initialState);
//# sourceMappingURL=checkoutReceipt.js.map