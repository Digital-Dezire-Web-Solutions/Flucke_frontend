import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({item}) => {
  return (
    <div className="rl-cart-page__hero">
      <nav className="rl-cart-page__breadcrumb">
        <Link to="/">Home</Link>
        <span>›</span>
        <span>Cart</span>
      </nav>
      <h1 className="rl-cart-page__heading">
        Your Cart ({String(item.length).padStart(2, "0")})
      </h1>
    </div>
  );
};

export default Breadcrumb;
