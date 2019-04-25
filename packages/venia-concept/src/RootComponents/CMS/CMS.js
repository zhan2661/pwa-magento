import React, { Component } from 'react';
import CategoryList from 'src/components/CategoryList';
import Home from 'src/components/Home';
import styles from './cmsPage.css'
export default class CMS extends Component {
    render() {
        return (
            <div className={styles.root}>
            <CategoryList title="Shop by category" id={2} />
            <Home/>
            </div>
            );
    }
}
