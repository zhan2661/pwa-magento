function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { handleActions } from 'redux-actions';
import get from 'lodash/get';
import { Util } from '@magento/peregrine';
import actions from "../actions/checkout";
const {
  BrowserPersistence
} = Util;
const storage = new BrowserPersistence();
export const name = 'checkout';
const initialState = {
  availableShippingMethods: [],
  billingAddress: null,
  editing: null,
  paymentCode: '',
  paymentData: null,
  shippingAddress: null,
  shippingMethod: '',
  shippingTitle: '',
  step: 'cart',
  submitting: false,
  isAddressIncorrect: false,
  incorrectAddressMessage: ''
};
const reducerMap = {
  [actions.begin]: state => {
    const storedBillingAddress = storage.getItem('billing_address');
    const storedPaymentMethod = storage.getItem('paymentMethod');
    const storedShippingAddress = storage.getItem('shipping_address');
    const storedShippingMethod = storage.getItem('shippingMethod');
    return _objectSpread({}, state, {
      billingAddress: storedBillingAddress,
      paymentCode: storedPaymentMethod && storedPaymentMethod.code,
      paymentData: storedPaymentMethod && storedPaymentMethod.data,
      shippingAddress: storedShippingAddress,
      shippingMethod: storedShippingMethod && storedShippingMethod.carrier_code,
      shippingTitle: storedShippingMethod && storedShippingMethod.carrier_title,
      editing: null,
      step: 'form'
    });
  },
  [actions.edit]: (state, {
    payload
  }) => {
    return _objectSpread({}, state, {
      editing: payload,
      incorrectAddressMessage: ''
    });
  },
  [actions.billingAddress.submit]: state => state,
  [actions.billingAddress.accept]: (state, {
    payload
  }) => {
    return _objectSpread({}, state, {
      billingAddress: payload
    });
  },
  [actions.billingAddress.reject]: state => state,
  [actions.getShippingMethods.receive]: (state, {
    payload,
    error
  }) => {
    if (error) {
      return state;
    }

    return _objectSpread({}, state, {
      availableShippingMethods: payload.map(method => _objectSpread({}, method, {
        code: method.carrier_code,
        title: method.carrier_title
      }))
    });
  },
  [actions.shippingAddress.submit]: state => {
    return _objectSpread({}, state, {
      submitting: true
    });
  },
  [actions.shippingAddress.accept]: (state, {
    payload
  }) => {
    return _objectSpread({}, state, {
      editing: null,
      shippingAddress: payload,
      step: 'form',
      submitting: false,
      isAddressIncorrect: false,
      incorrectAddressMessage: ''
    });
  },
  [actions.shippingAddress.reject]: (state, actionArgs) => {
    const incorrectAddressMessage = get(actionArgs, 'payload.incorrectAddressMessage', '');
    return _objectSpread({}, state, {
      submitting: false,
      isAddressIncorrect: incorrectAddressMessage ? true : false,
      incorrectAddressMessage
    });
  },
  [actions.paymentMethod.submit]: state => {
    return _objectSpread({}, state, {
      submitting: true
    });
  },
  [actions.paymentMethod.accept]: (state, {
    payload
  }) => {
    return _objectSpread({}, state, {
      editing: null,
      paymentCode: payload.code,
      paymentData: payload.data,
      step: 'form',
      submitting: false
    });
  },
  [actions.paymentMethod.reject]: state => {
    return _objectSpread({}, state, {
      submitting: false
    });
  },
  [actions.shippingMethod.submit]: state => {
    return _objectSpread({}, state, {
      submitting: true
    });
  },
  [actions.shippingMethod.accept]: (state, {
    payload
  }) => {
    return _objectSpread({}, state, {
      editing: null,
      shippingMethod: payload.carrier_code,
      shippingTitle: payload.carrier_title,
      step: 'form',
      submitting: false,
      isAddressIncorrect: false,
      incorrectAddressMessage: ''
    });
  },
  [actions.shippingMethod.reject]: state => {
    return _objectSpread({}, state, {
      submitting: false
    });
  },
  [actions.order.submit]: state => {
    return _objectSpread({}, state, {
      submitting: true
    });
  },
  [actions.order.accept]: state => {
    return _objectSpread({}, state, {
      editing: null,
      step: 'receipt',
      submitting: false
    });
  },
  [actions.order.reject]: state => {
    return _objectSpread({}, state, {
      submitting: false
    });
  },
  [actions.reset]: () => initialState
};
export default handleActions(reducerMap, initialState);
//# sourceMappingURL=checkout.js.map