function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import Star from "./Star";
import PropTypes from 'prop-types';
import styles from "./Rating.css";

class StarRating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starsSelected: props.starsSelected || 0
    };
    this.change = this.change.bind(this);
  }

  change(starsSelected) {
    this.setState({
      starsSelected
    });
  }

  render() {
    const {
      totalStars
    } = this.props;
    const {
      starsSelected
    } = this.state;
    return React.createElement("div", null, React.createElement("div", {
      className: styles.starRating
    }, [...Array(totalStars)].map((n, i) => React.createElement(Star, {
      key: i,
      selected: i < starsSelected,
      onClick: () => this.change(i + 1)
    }))), React.createElement("br", null), React.createElement("p", {
      className: styles.p
    }, starsSelected, " of ", totalStars, " stars"));
  }

}

_defineProperty(StarRating, "propTypes", {
  totalStars: PropTypes.number
});

_defineProperty(StarRating, "defaultProps", {
  totalStars: 5
});

export default StarRating;
//# sourceMappingURL=StarRating.js.map