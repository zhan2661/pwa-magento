import React, { Component } from 'react';
import styles from "./home.css";

class Home extends Component {
  render() {
    return React.createElement("article", {
      className: "Home"
    }, React.createElement("h1", {
      className: styles["Home-title"]
    }, React.createElement("span", null, "Venia")), React.createElement("section", {
      className: styles["Home-hero"]
    }, React.createElement("h2", {
      className: styles["Home-hero-title"]
    }, React.createElement("span", null, "\u2018Fall\u2019 In Love With"), React.createElement("br", null), React.createElement("span", null, "Pieces Inspired By Paris")), React.createElement("div", {
      className: styles["Home-hero-actions"]
    }, React.createElement("a", {
      className: styles["Home-hero-actions-action"],
      href: "shop-the-look.html"
    }, React.createElement("span", null, "Shop Outerwear")))), React.createElement("section", {
      className: styles["Home-saleBanner"]
    }, React.createElement("p", {
      className: styles["Home-saleBanner-copy"]
    }, React.createElement("span", null, "Sale on all shoes this weekend!")), React.createElement("p", {
      className: styles["Home-saleBanner-copy"]
    }, React.createElement("span", null, "Use promo code HAPPYFEET"))), React.createElement("section", {
      className: styles["Home-storySection"]
    }, React.createElement("h2", {
      className: styles["Home-storySection-title"]
    }, React.createElement("span", null, "Our Story")), React.createElement("div", {
      className: styles["Home-storySection-image"]
    }), React.createElement("div", {
      className: styles["Home-storySection-content"]
    }, React.createElement("p", {
      className: styles["Home-storySection-content-copy"]
    }, React.createElement("span", null, "Style is personal. Realizing this wasn't what most brands were sensitive to, we built a lifestyle brand that caters to creative, sensitive, strong women.")), React.createElement("p", {
      className: styles["Home-storySection-content-copy"]
    }, React.createElement("span", null, "Venia opened its very first doors in the autumn of 1992 in Lima, Peru. We now operate over 200 stores worldwide.")), React.createElement("div", {
      className: styles["Home-storySection-content-actions"]
    }, React.createElement("a", {
      className: styles["Home-storySection-content-actions-action"],
      href: "https://www.abercrombie.com/shop/us"
    }, React.createElement("span", null, "Read More"))))));
  }

}

export default Home;
//# sourceMappingURL=home.js.map