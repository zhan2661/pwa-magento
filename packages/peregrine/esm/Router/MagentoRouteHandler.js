function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { func, shape, string } from 'prop-types'; // 2019-01-28 Removed virtual `FETCH_ROOT_COMPONENT` import. It's much cleaner
// to inject a "fetchRootComponent" global at build time, so that's what we
// changed the MagentoRootComponentsPlugin to do.

import resolveUnknownRoute from "./resolveUnknownRoute";
const InternalError = Symbol('InternalError');
const NotFound = Symbol('NotFound');
const mountedInstances = new WeakSet();
export default class MagentoRouteHandler extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      componentMap: new Map(),
      errorState: {
        hasError: false,
        internalError: false,
        notFound: false
      }
    });
  }

  // TODO: Add the ability to customize the cache name
  async addToCache(urls) {
    if (!window.caches) {
      throw new Error('Current environment does not support CacheStorage at window.caches.');
    }

    const myCache = await window.caches.open(`workbox-runtime-${location.origin}/`);
    await myCache.addAll(urls);
  }

  componentDidMount() {
    const {
      pathname
    } = this.props.location;
    const isSearch = pathname === '/search.html';
    mountedInstances.add(this);

    if (!isSearch) {
      this.getRouteComponent(pathname);
    }
  }

  componentDidUpdate() {
    const {
      props,
      state
    } = this;
    const {
      pathname
    } = props.location;
    const isKnown = state.componentMap.has(pathname);
    const isSearch = pathname === '/search.html'; // `NOTFOUND` component needs a unique id
    // currently it is set to -1

    const isNotFoundComponent = isKnown ? state.componentMap.get(pathname).id === -1 : false;
    const shouldReloadRoute = isNotFoundComponent && navigator.onLine;

    if (!isKnown && !isSearch || shouldReloadRoute) {
      this.getRouteComponent();
    }
  }

  componentWillUnmount() {
    mountedInstances.delete(this);
  }

  async getRouteComponent() {
    const {
      apiBase,
      location: {
        pathname
      }
    } = this.props; // Depending on the environment, the fetchRootComponent global can be
    // either an ES module with a `default` property or a plain CJS module.

    const fetchRoot = 'default' in fetchRootComponent ? fetchRootComponent.default : fetchRootComponent;

    try {
      // try to resolve the route
      // if this throws, we essentially have a 500 Internal Error
      const resolvedRoute = await resolveUnknownRoute({
        apiBase,
        route: pathname
      });
      const {
        type,
        id
      } = resolvedRoute; // if resolution and destructuring succeed but return no match
      // then we have a straightforward 404 Not Found

      if (!type || !id) {
        throw new Error('404');
      } // at this point we should have a matching RootComponent
      // if this throws, we essentially have a 500 Internal Error


      const RootComponent = await fetchRoot(type); // associate the matching RootComponent with this location

      this.setRouteComponent(pathname, RootComponent, {
        id
      });
    } catch ({
      message
    }) {
      const symbol = message === '404' ? NotFound : InternalError; // we don't have a matching RootComponent, but we've checked for one
      // so associate the appropriate error case with this location

      this.setRouteComponent(pathname, symbol);
    }
  }

  setRouteComponent(pathname, RootComponent, meta) {
    if (!mountedInstances.has(this)) {
      // avoid setState if component is not mounted for any reason
      return;
    }

    this.addToCache([pathname]).catch(e => {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Could not add ${pathname} to cache:`, e);
      }
    });
    this.setState(({
      componentMap
    }) => ({
      componentMap: new Map(componentMap).set(pathname, _objectSpread({
        RootComponent
      }, meta)),
      errorState: {
        hasError: typeof RootComponent === 'symbol',
        internalError: RootComponent === InternalError,
        notFound: RootComponent === NotFound
      }
    }));
  }

  renderChildren(loading) {
    const {
      props,
      state
    } = this;
    const {
      children
    } = props;
    const {
      errorState
    } = state;
    return typeof children === 'function' ? children(_objectSpread({}, errorState, {
      loading
    })) : null;
  }

  render() {
    const {
      props,
      state
    } = this;
    const {
      pathname
    } = props.location;
    const {
      componentMap,
      errorState
    } = state; // if we have no record of this pathname, we're still loading
    // and we have no RootComponent, so render children

    if (!componentMap.has(pathname)) {
      return this.renderChildren(true);
    } // if we're in an error state, we're not loading anymore
    // but we have no RootComponent, so render children


    if (errorState.hasError) {
      return this.renderChildren(false);
    } // otherwise we do have a RootComponent, so render it


    const _componentMap$get = componentMap.get(pathname),
          {
      RootComponent
    } = _componentMap$get,
          routeProps = _objectWithoutProperties(_componentMap$get, ["RootComponent"]);

    return React.createElement(RootComponent, _extends({}, routeProps, {
      key: pathname
    }));
  }

}

_defineProperty(MagentoRouteHandler, "propTypes", {
  apiBase: string.isRequired,
  children: func,
  location: shape({
    pathname: string.isRequired
  }).isRequired
});
//# sourceMappingURL=MagentoRouteHandler.js.map