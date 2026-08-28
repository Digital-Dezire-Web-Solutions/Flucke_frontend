import React from "react";
import ProductGrid from "../../Components/ProductGrid/ProductGrid";
import Poster from "../../Assets/Banner/page-title-shop.jpg";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import LuxuryCta from "../../Components/LuxuryCta/LuxuryCta";
import AboutUs from "../../Components/AboutUs/AboutUs";
import Benefits from "../../Components/Benefits/Benefits";
import Testimonials from "../../Components/Testimonials/Testimonials";

const About = () => {
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
              <Link to={"/about"}>About</Link>
            </div>
            <h1>About Us</h1>
            <p>
              Our clinically proven formulas rebuild the skin's balance — restoring calm, clarity, and visible radiance.
            </p>
          </div>
        </div>
      </div>
      <AboutUs />
      <Testimonials />
      <Benefits />
      <LuxuryCta />
    </div>
  );
};

export default About;
