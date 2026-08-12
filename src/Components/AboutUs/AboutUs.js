import React from "react";
import "./AboutUs.css";

const DEFAULT_FEATURES = [
  {
    icon: "✨",
    title: "Brightening & Repairing Retinol Serum",
    text: "A transformative formula that helps reduce the appearance of wrinkles, improve skin texture, and restore natural radiance. Enriched with active ingredients that support skin renewal, leaving your complexion smoother, firmer, and visibly revitalized.",
  },
  {
    icon: "🔮",
    title: "Hyaluronic Acid Anti-Wrinkle Serum",
    text: "An intensely hydrating serum that replenishes moisture, plumps the skin, and helps diminish the appearance of fine lines. Its lightweight formula deeply nourishes while promoting a firmer, healthier-looking complexion",
  },
];

export default function AboutUs({
  eyebrow = "About Us",
  heading = "FLUCKE Luxury Skincare",
  paragraphs = [
    "At FLUCKE Luxury Skincare, we are dedicated to providing premium beauty and skincare products that deliver maximum results. Our formulations are crafted with the finest ingredients to ensure visible improvements and healthy, radiant skin for your clients.",
    "Experience the perfect balance of nature and innovation with Flucke Luxury Skincare. Crafted with premium ingredients and advanced skincare technology, our high-performance serums are designed to hydrate, repair, firm, and rejuvenate the skin for a radiant, youthful-looking complexion",
  ],
  lead = "At the heart of our collection are two powerful skincare essentials:",
  features = DEFAULT_FEATURES,
}) {
  return (
    <section className="rl-about">
      <div className="rl-about__intro">
        <span className="rl-about__eyebrow">{eyebrow}</span>
        <h2 className="rl-about__heading">{heading}</h2>

        {paragraphs.map((p, i) => (
          <p className="rl-about__paragraph" key={i}>
            {p}
          </p>
        ))}

        <p className="rl-about__lead">{lead}</p>
      </div>

      <div className="rl-about__cards">
        {features.map((f) => (
          <div className="rl-about__card" key={f.title}>
            <span className="rl-about__card-icon">{f.icon}</span>
            <h3 className="rl-about__card-title">{f.title}</h3>
            <p className="rl-about__card-text">{f.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}