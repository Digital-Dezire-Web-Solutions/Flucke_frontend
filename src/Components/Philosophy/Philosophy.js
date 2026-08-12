import React from "react";
import "./Philosophy.css";
import collect1 from "../../Assets/Collections/collect-27.jpg"
import collect2 from "../../Assets/Collections/collect-28.jpg"
import collect3 from "../../Assets/Collections/collect-29.jpg"
import product1 from "../../Assets/Products/product4.jpg"
import product2 from "../../Assets/Products/product5.jpg"
import product3 from "../../Assets/Products/product3.jpg"

function ArrowIcon() {
  return (
    <svg width="13" height="11" viewBox="0 0 13 11" fill="none">
      <path
        d="M0.5 5.5H12M12 5.5L7.5 1M12 5.5L7.5 10"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const DEFAULT_CATEGORIES = [
  {
    image: product1,
    title: "Rosaline · Boosting Serums",
    subtitle: "Concentrated hydration for radiant, dewy skin.",
    linkLabel: "Shop Serums",
    href: "#!",
  },
  {
    image: product2,
    title: "Soothing Cleansers",
    subtitle: "Gentle formulas that reset your skin without stripping.",
    linkLabel: "Browse Cleansers",
    href: "#!",
  },
//   {
//     image: product3,
//     title: "Everyday Hydration",
//     subtitle: "Moisturizers that lock in your glow, day and night.",
//     linkLabel: "Hydrate Now",
//     href: "#!",
//   },
];

export default function Philosophy({
  eyebrow = "Why We Go Minimal",
  inlineImages = {
    cream: collect1,
    cotton: collect2,
    face: collect3,
  },
  categories = DEFAULT_CATEGORIES,
}) {
  return (
    <section className="rl-philosophy">
      <div className="rl-philosophy__statement">
        <span className="rl-about__eyebrow">
          {/* <span className="rl-philosophy__eyebrow-dot" /> */}
          {eyebrow}
        </span>

        <p className="rl-philosophy__text">
          Our philosophy
          <img className="rl-philosophy__inline rl-philosophy__inline--pill" src={inlineImages.cream} alt="" />
          is rooted in simplicity.
          <br />
          No fillers. No unnecessary steps
          <img className="rl-philosophy__inline rl-philosophy__inline--pill" src={inlineImages.cotton} alt="" />
          Just effective skincare
          <img className="rl-philosophy__inline rl-philosophy__inline--pill" src={inlineImages.face} alt="" />
          {/* <br /> */}
          that lets your skin breathe
          <br />
          and glow naturally.
        </p>
      </div>

      {/* <div className="rl-philosophy__grid">
        {categories.map((cat) => (
          <a className="rl-philosophy__card" href={cat.href} key={cat.title}>
            <div className="rl-philosophy__card-image" style={{ backgroundImage: `url(${cat.image})` }} />
            <div className="rl-philosophy__card-scrim" />
            <div className="rl-philosophy__card-content">
              <h3 className="rl-philosophy__card-title">{cat.title}</h3>
              <p className="rl-philosophy__card-subtitle">{cat.subtitle}</p>
              <span className="rl-philosophy__card-link">
                {cat.linkLabel}
                <ArrowIcon />
              </span>
            </div>
          </a>
        ))}
      </div>
       <a className="rl-products__view-all" >
        View All Products
        <ArrowIcon />
      </a> */}
    </section>
  );
}