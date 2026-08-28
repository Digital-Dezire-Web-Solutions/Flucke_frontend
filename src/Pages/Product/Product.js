import React from "react";
import ProductGrid from "../../Components/ProductGrid/ProductGrid";
import Poster from "../../Assets/Banner/page-title-shop.jpg"
import "./Product.css"
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import LuxuryCta from "../../Components/LuxuryCta/LuxuryCta";

const Product = () => {
    return (
        <div className="product-page">
            <div className="product-page-banner">
                <div className="product-page-banner-img">
                    <img src={Poster} alt="" />
                </div>
                <div className="product-page-banner-box">
                    <div className="product-page-banner-detail">
                        <div className="breadcrum">
                            <Link to={"/"}>Home</Link>
                            <FaChevronRight />
                            <Link to={"/product"}>Shop</Link>
                        </div>
                        <h1>Shop All Products</h1>
                        <p>From gentle cleansers to powerful serums, find your skin’s perfect match
                            among our best-selling and newest skincare formulas.</p>
                    </div>
                </div>
            </div>
            <ProductGrid />
            <LuxuryCta />
        </div>
    );
};

export default Product;
