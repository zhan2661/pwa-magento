function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { handleActions } from 'redux-actions';
import actions from "../actions/cart";
import checkoutActions from "../actions/checkout";
export const name = 'cart';
export const initialState = {
  details: {},
  guestCartId: null,
  isLoading: false,
  isOptionsDrawerOpen: false,
  isUpdatingItem: false,
  isAddingItem: false,
  paymentMethods: [],
  shippingMethods: [],
  totals: {}
};
const reducerMap = {
  [actions.getGuestCart.receive]: (state, {
    payload,
    error
  }) => {
    if (error) {
      return initialState;
    }

    return _objectSpread({}, state, {
      guestCartId: payload
    });
  },
  [actions.getDetails.request]: (state, {
    payload
  }) => {
    return _objectSpread({}, state, {
      guestCartId: payload,
      isLoading: true
    });
  },
  [actions.getDetails.receive]: (state, {
    payload,
    error
  }) => {
    if (error) {
      return _objectSpread({}, state, {
        isLoading: false,
        guestCartId: null
      });
    }

    return _objectSpread({}, state, payload, {
      isLoading: false
    });
  },
  [actions.addItem.request]: state => {
    return _objectSpread({}, state, {
      isAddingItem: true
    });
  },
  [actions.addItem.receive]: state => {
    return _objectSpread({}, state, {
      isAddingItem: false
    });
  },
  [actions.updateItem.request]: (state, {
    payload,
    error
  }) => {
    if (error) {
      return initialState;
    }

    return _objectSpread({}, state, payload, {
      isUpdatingItem: true
    });
  },
  [actions.updateItem.receive]: state => {
    // We don't actually have to update any items here
    // because we force a refresh from the server.
    return _objectSpread({}, state, {
      isUpdatingItem: false
    });
  },
  [actions.removeItem.receive]: (state, {
    payload,
    error
  }) => {
    if (error) {
      return initialState;
    } // If we are emptying the cart, perform a reset to prevent
    // a bug where the next item added to cart would have a price of 0


    if (payload.cartItemCount == 1) {
      return initialState;
    }

    return _objectSpread({}, state, payload);
  },
  [actions.openOptionsDrawer]: state => {
    return _objectSpread({}, state, {
      isOptionsDrawerOpen: true
    });
  },
  [actions.closeOptionsDrawer]: state => {
    return _objectSpread({}, state, {
      isOptionsDrawerOpen: false
    });
  },
  [checkoutActions.order.accept]: () => {
    return initialState;
  }
};
export default handleActions(reducerMap, initialState);
//# sourceMappingURL=cart.js.map