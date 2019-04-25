function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { Form } from 'informed';
import { bool, func, object, shape, string } from 'prop-types';
import getQueryParameterValue from "../../util/getQueryParameterValue";
import { SEARCH_QUERY_PARAMETER } from "../../RootComponents/Search/consts";
import SearchAutocomplete from "./autocomplete";
import Icon from "../Icon";
import ClearIcon from 'react-feather/dist/icons/x';
import SearchIcon from 'react-feather/dist/icons/search';
import TextInput from "../TextInput";
import Trigger from "../Trigger";
import classify from "../../classify";
import defaultClasses from "./searchBar.css";
const initialValues = {
  search_query: ''
};
const clearIcon = React.createElement(Icon, {
  src: ClearIcon,
  size: 18
});
const searchIcon = React.createElement(Icon, {
  src: SearchIcon,
  size: 18
}); // TODO: remove export here (update story and test)

export class SearchBar extends Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "componentWillUnmount", () => {
      document.removeEventListener('mousedown', this.autocompleteClick, false);
    });

    _defineProperty(this, "autocompleteClick", e => {
      if (this.searchRef.current.contains(e.target) || this.autocompleteRef.current.contains(e.target)) return;
      this.updateAutocompleteVisible(false);
    });

    _defineProperty(this, "inputFocus", () => {
      this.updateAutocompleteVisible(true);
    });

    _defineProperty(this, "updateAutocompleteVisible", visible => {
      this.setState({
        autocompleteVisible: visible
      });
    });

    _defineProperty(this, "handleChange", ({
      values
    }) => {
      const dirty = !!values.search_query;
      dirty !== this.state.dirty && this.setState({
        dirty
      });
    });

    _defineProperty(this, "handleInputChange", () => this.updateAutocompleteVisible(true));

    _defineProperty(this, "handleSubmit", ({
      search_query
    }) => {
      if (search_query) {
        this.props.executeSearch(search_query, this.props.history);
        this.updateAutocompleteVisible(false);
      }
    });

    _defineProperty(this, "resetForm", () => {
      this.updateAutocompleteVisible(false);
      this.formApi.reset();
    });

    _defineProperty(this, "setApi", formApi => {
      this.formApi = formApi;
    });

    this.searchRef = React.createRef();
    this.autocompleteRef = React.createRef();
    this.state = {
      dirty: false,
      autocompleteVisible: false
    };
  }

  componentDidMount() {
    const searchValueFromQueryString = getQueryParameterValue({
      location: this.props.location,
      queryParameter: SEARCH_QUERY_PARAMETER
    });
    document.addEventListener('mousedown', this.autocompleteClick, false);
    this.formApi.setValue('search_query', searchValueFromQueryString);
  }

  componentDidUpdate(prevProps) {
    if (this.props.isOpen !== prevProps.isOpen) {
      this.searchRef.current.querySelector('input').focus();
    }
  }

  get resetButton() {
    const {
      resetForm,
      state
    } = this;
    return state.dirty && React.createElement(Trigger, {
      action: resetForm
    }, clearIcon);
  }

  render() {
    const {
      props,
      resetButton,
      formApi
    } = this;
    const {
      autocompleteVisible
    } = this.state;
    const {
      classes,
      isOpen
    } = props;
    const className = isOpen ? classes.root_open : classes.root;
    const {
      values
    } = formApi && formApi.getState() || {};
    const searchQuery = values && values.search_query || '';
    return React.createElement("div", {
      className: className
    }, React.createElement("div", {
      className: classes.searchInner,
      ref: this.searchRef
    }, React.createElement(Form, {
      className: classes.form,
      getApi: this.setApi,
      autoComplete: "off",
      initialValues: initialValues,
      onChange: this.handleChange,
      onSubmit: this.handleSubmit
    }, React.createElement(TextInput, {
      field: "search_query",
      onFocus: this.inputFocus,
      onChange: this.handleInputChange,
      after: resetButton,
      before: searchIcon
    }), React.createElement("div", {
      className: classes.SearchAutocompleteWrapper,
      ref: this.autocompleteRef
    }, React.createElement(SearchAutocomplete, {
      searchQuery: searchQuery,
      updateAutocompleteVisible: this.updateAutocompleteVisible,
      autocompleteVisible: autocompleteVisible,
      executeSearch: this.props.executeSearch,
      history: this.props.history
    })))));
  }

}

_defineProperty(SearchBar, "propTypes", {
  classes: shape({
    clearIcon: string,
    clearIcon_off: string,
    root: string,
    searchBlock: string,
    searchBlockOpen: string,
    searchBar: string,
    searchIcon: string
  }),
  executeSearch: func.isRequired,
  history: object,
  isOpen: bool,
  location: object,
  match: object
});

export default classify(defaultClasses)(SearchBar);
//# sourceMappingURL=searchBar.js.map