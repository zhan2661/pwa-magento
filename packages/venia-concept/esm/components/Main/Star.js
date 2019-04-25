import React from 'react';
import PropTypes from 'prop-types';
import styles from "./Rating.css";

const Star = ({
  selected = false,
  onClick = f => f
}) => React.createElement("div", {
  className: selected ? styles.selected : styles.star,
  onClick: onClick
});

Star.propTypes = {
  selected: PropTypes.bool,
  onClick: PropTypes.func
};
export default Star;
//# sourceMappingURL=Star.js.map