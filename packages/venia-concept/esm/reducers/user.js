function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { handleActions } from 'redux-actions';
import { Util } from '@magento/peregrine';
const {
  BrowserPersistence
} = Util;
const storage = new BrowserPersistence();
import actions from "../actions/user";
export const name = 'user';

const isSignedIn = () => !!storage.getItem('signin_token');

const initialState = {
  currentUser: {
    email: '',
    firstname: '',
    lastname: ''
  },
  isSignedIn: isSignedIn(),
  forgotPassword: {
    email: '',
    isInProgress: false
  },
  signInError: {}
};
const reducerMap = {
  [actions.signIn.receive]: (state, {
    payload,
    error
  }) => {
    if (error) {
      return initialState;
    }

    return _objectSpread({}, state, {
      isSignedIn: true,
      currentUser: payload
    });
  },
  [actions.signInError.receive]: (state, {
    payload
  }) => {
    return _objectSpread({}, state, {
      isSignedIn: false,
      signInError: payload
    });
  },
  [actions.createAccountError.receive]: (state, {
    payload
  }) => {
    return _objectSpread({}, state, {
      createAccountError: payload
    });
  },
  [actions.resetSignInError.receive]: state => {
    return _objectSpread({}, state, {
      signInError: {}
    });
  },
  [actions.resetCreateAccountError.receive]: state => {
    return _objectSpread({}, state, {
      createAccountError: {}
    });
  },
  [actions.resetPassword.request]: (state, {
    payload
  }) => {
    return _objectSpread({}, state, {
      forgotPassword: {
        email: payload,
        isInProgress: true
      }
    });
  },
  // TODO: handle the reset password response from the API.
  [actions.resetPassword.receive]: state => state,
  [actions.completePasswordReset]: (state, {
    payload
  }) => {
    const {
      email
    } = payload;
    return _objectSpread({}, state, {
      forgotPassword: {
        email,
        isInProgress: false
      }
    });
  },
  [actions.signIn.reset]: () => {
    return _objectSpread({}, initialState, {
      isSignedIn: isSignedIn()
    });
  }
};
export default handleActions(reducerMap, initialState);
//# sourceMappingURL=user.js.map