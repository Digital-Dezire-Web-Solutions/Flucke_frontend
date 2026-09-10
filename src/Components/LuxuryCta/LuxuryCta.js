import React from "react";
import "./LuxuryCta.css";

export default function LuxuryCta({
  heading = "Experience Luxury Skincare Today",
  subheading = "Shop genuine Flucke products directly from Amazon.",
  ctaLabel = "Buy From Amazon",
  ctaHref = "https://www.amazon.in/s?k=Flucke&ref=bl_dp_s_web_0",
}) {
  return (
    <section className="rl-luxury-cta">
      <div className="rl-luxury-cta__text">
        <h2 className="rl-luxury-cta__heading">{heading}</h2>
        <p className="rl-luxury-cta__subheading">{subheading}</p>
      </div>

      <a
        className="rl-luxury-cta__btn"
        href={ctaHref}
        target="_blank"
        rel="noopener noreferrer"
      >
        {ctaLabel}
      </a>
    </section>
  );
}
