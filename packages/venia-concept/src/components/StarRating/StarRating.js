import React,{Component}from 'react';
import Star from './Star';
import PropTypes from 'prop-types'
import styles from './Rating.css'


class StarRating extends Component {
    static propTypes = {
        totalStars: PropTypes.number
    }
    static defaultProps = {
        totalStars: 5
    }
    constructor(props) {
        super(props)
        this.state = {
            starsSelected: props.starsSelected || 0
        }
        this.change = this.change.bind(this)
    }
    change(starsSelected) {
        this.setState({starsSelected})
    }
    render() {
        const {totalStars} = this.props
        const {starsSelected} = this.state
        return (
            <div className={styles.react}>
            <div className={styles.starRating}>
                {[...Array(totalStars)].map((n, i) =>
                    <Star key={i}
                          selected={i<starsSelected}
                          onClick={() => this.change(i+1)}
                    />
                )}
            </div>
                <br/>
            <p className={styles.p}>Rate this Product {starsSelected} of {totalStars} stars</p>
            </div>
    )
    }
}

export default StarRating





   