import React, { Component } from 'react';
import styles from './home.css';
// import Gallery from 'src/components/Gallery';

class Home extends Component {
    render() {
        return (
            <article className="Home">
                <h1 className={styles["Home-title"]}>
                    <span>Venia</span>
                </h1>
                <section className={styles["Home-hero"]}>
                    <h2 className={styles["Home-hero-title"]}>
                        <span>&lsquo;Fall&rsquo; In Love With</span>
                        <br />
                        <span>Pieces Inspired By Paris</span>
                    </h2>
                    <div className={styles["Home-hero-actions"]}>
                        <a
                            className={styles["Home-hero-actions-action"]}
                            href="shop-the-look.html"
                        >
                            <span>Shop Outerwear</span>
                        </a>
                    </div>
                </section>
                <section className={styles["Home-saleBanner"]}>
                    <p className={styles["Home-saleBanner-copy"]}>
                        <span>Sale on all shoes this weekend!</span>
                    </p>
                    <p className={styles["Home-saleBanner-copy"]}>
                        <span>Use promo code HAPPYFEET</span>
                    </p>
                </section>
                <section className={styles["Home-storySection"]}>
                    <h2 className={styles["Home-storySection-title"]}>
                        <span>Our Story</span>
                    </h2>
                    <div className={styles["Home-storySection-image"]}/>
                    <div className={styles["Home-storySection-content"]}>
                        <p className={styles["Home-storySection-content-copy"]}>
                            <span>
                                Style is personal. Realizing this wasn't what
                                most brands were sensitive to, we built a
                                lifestyle brand that caters to creative,
                                sensitive, strong women.
                            </span>
                        </p>
                        <p className={styles["Home-storySection-content-copy"]}>
                            <span>
                                Venia opened its very first doors in the autumn
                                of 1992 in Lima, Peru. We now operate over 200
                                stores worldwide.
                            </span>
                        </p>
                        <div className={styles["Home-storySection-content-actions"]}>
                            <a
                                className={styles["Home-storySection-content-actions-action"]}
                                href="https://www.abercrombie.com/shop/us"
                            >
                                <span>Read More</span>
                            </a>
                        </div>
                    </div>
                </section>
                {/*<Gallery pageSize={1}/>*/}
            </article>
        );
    }
}

export default Home;
