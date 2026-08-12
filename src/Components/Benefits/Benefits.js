import React from "react";
import "./Benefits.css";

const DEFAULT_BENEFITS = [
  "Deep Hydration",
  "Brighter Complexion",
  "Improved Skin Texture",
  "Reduced Fine Lines",
  "Healthy Glow",
  "Lightweight Formula",
];

export default function Benefits({
  eyebrow = "Healthy Skin Starts Here",
  heading = "Designed To Support Beautiful, Healthy Looking Skin",
  subheading = "Flucke products combine premium skincare ingredients with elegant formulations to create an everyday luxury skincare experience.",
  benefits = DEFAULT_BENEFITS,
}) {
  return (
    <section className="rl-benefits">
      <div className="rl-benefits__text">
        <span className="rl-benefits__eyebrow">{eyebrow}</span>
        <h2 className="rl-benefits__heading">{heading}</h2>
        <p className="rl-benefits__subheading">{subheading}</p>
      </div>

      <div className="rl-benefits__grid">
        {benefits.map((b) => (
          <div className="rl-benefits__card" key={b}>
            <span className="rl-benefits__check">✓</span>
            {b}
          </div>
        ))}
      </div>
    </section>
  );
}