import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classify from 'src/classify';
import logo from './logo1.svg';

class Logo extends Component {
    static propTypes = {
        classes: PropTypes.shape({
            logo: PropTypes.string
        }),
        height: PropTypes.number,

    };

    static defaultProps = {
        height: 27,
    };

    render() {
        const { height, classes } = this.props;

        return (
            <img
                className={classes.logo}
                src={logo}
                height={height}
                width="281"
                alt="Venia"
                title="Venia"
            />
        );
    }
}

export default classify({})(Logo);
