import React from "react";
import Banner from "../../Components/Banner/Banner";
import AboutUs from "../../Components/AboutUs/AboutUs";
import Philosophy from "../../Components/Philosophy/Philosophy";
import ProductGrid from "../../Components/ProductGrid/ProductGrid";
import BeforeAfter from "../../Components/BeforeAfter/BeforeAfter";
import ProductDetail from "../../Components/ProductDetail/ProductDetail";
import Testimonials from "../../Components/Testimonials/Testimonials";
import LuxuryCta from "../../Components/LuxuryCta/LuxuryCta";
import Benefits from "../../Components/Benefits/Benefits";
import Contact from "../../Components/Contact/Contact";

const Home = () => {
  return (
    <div>
      <Banner />
      <ProductGrid />
      <AboutUs />
      <Philosophy />
      <ProductDetail />
      <BeforeAfter />
      <Benefits/>
      <Testimonials />
      <Contact/>
      <LuxuryCta />
    </div>
  );
};

export default Home;
