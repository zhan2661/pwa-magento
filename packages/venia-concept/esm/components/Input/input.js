function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import defaultClasses from "./input.css";
import classify from "../../classify";
import { Text } from 'informed';
export const HelpTypes = {
  hint: 'hint',
  error: 'error',
  success: 'success'
};

class Input extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      value: this.props.initialValue,
      focused: false,
      dirty: false
    });

    _defineProperty(this, "handleChange", event => {
      this.setState({
        value: event.target.value
      });
      this.props.onChange ? this.props.onChange(event.target.value) : null;
      this.makeDirty();
    });

    _defineProperty(this, "focusTextInput", () => {
      this.setState({
        focused: true
      });
    });

    _defineProperty(this, "blurTextInput", () => {
      this.setState({
        focused: false
      });
    });

    _defineProperty(this, "makeDirty", () => {
      if (!this.state.dirty) {
        this.setState({
          dirty: true
        });
      }
    });
  }

  componentDidMount() {
    const {
      initialValue,
      onChange
    } = this.props;

    if (initialValue && onChange) {
      onChange(initialValue);
    }
  }

  get helpText() {
    const {
      helpVisible,
      classes,
      helpText,
      helpType
    } = this.props;
    const helpTypeClass = `${classes.helpText} ${classes[helpType]}`;
    return helpVisible ? React.createElement("div", {
      className: helpTypeClass
    }, helpText) : null;
  }

  get labelText() {
    const {
      classes,
      label
    } = this.props;
    let className = `${classes.label}`;

    if (this.state.focused) {
      className += ` ${classes.labelFocused}`;
    }

    return React.createElement("span", {
      className: className
    }, label);
  }

  get rootClass() {
    const {
      classes
    } = this.props;
    let className = `${classes.root}`;

    if (this.state.focused) {
      className += ` ${classes.rootFocused}`;
    }

    return className;
  }

  get requiredSymbol() {
    const {
      classes,
      required
    } = this.props;
    return required ? React.createElement("div", {
      className: classes.requiredSymbol
    }) : null;
  }

  render() {
    const {
      helpText,
      labelText,
      requiredSymbol,
      rootClass
    } = this;
    const {
      classes,
      placeholder,
      type,
      disabled,
      required,
      title,
      initialValue
    } = this.props;
    let {
      autoComplete,
      field
    } = this.props;

    if (!this.state.dirty) {
      field = initialValue ? initialValue : field;
    }

    autoComplete = !autoComplete ? 'off' : autoComplete;
    return React.createElement("div", {
      className: rootClass
    }, React.createElement("span", {
      className: classes.label
    }, requiredSymbol, "\xA0", labelText), React.createElement(Text, {
      initialValue: initialValue,
      className: classes.input,
      placeholder: placeholder,
      type: type,
      disabled: disabled,
      required: required,
      title: title,
      autoComplete: autoComplete,
      onChange: this.handleChange,
      onFocus: this.focusTextInput,
      onBlur: this.blurTextInput,
      field: field
    }), helpText);
  }

}

_defineProperty(Input, "propTypes", {
  classes: PropTypes.shape({
    helpText: PropTypes.string,
    hint: PropTypes.string,
    error: PropTypes.string,
    success: PropTypes.string,
    label: PropTypes.string,
    labelFocused: PropTypes.string,
    root: PropTypes.string,
    input: PropTypes.string,
    rootFocused: PropTypes.string
  }),
  initialValue: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  title: PropTypes.string,
  autoComplete: PropTypes.string,
  helpText: PropTypes.string,
  helpType: PropTypes.string,
  field: PropTypes.string.isRequired,
  onChange: PropTypes.func
});

_defineProperty(Input, "defaultProps", {
  disabled: false,
  helpVisible: true,
  helpType: HelpTypes.hint
});

export default classify(defaultClasses)(Input);
//# sourceMappingURL=input.js.map