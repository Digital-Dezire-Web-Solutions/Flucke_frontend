import React, { useState } from "react";
import "./Testimonials.css";

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10 1.5l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L1.3 7.8l6.1-.7L10 1.5Z" />
    </svg>
  );
}

function ArrowIcon({ direction = "left" }) {
  return (
    <svg width="26" height="18" viewBox="0 0 26 18" fill="none" style={{ transform: direction === "left" ? "scaleX(-1)" : undefined }}>
      <path
        d="M1 9H25M25 9L18 2M25 9L18 16"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const DEFAULT_TESTIMONIALS = [
  {
    quote:
      "I've tried dozens of brands, but nothing made my skin feel this calm and clear. The serum absorbed instantly, and my face didn't feel sticky at all — just healthy.",
    avatar: "https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z2lybCUyMGltYWdlfGVufDB8fDB8fHww",
    name: "Alina M., 32, New York",
    rating: 5,
  },
  {
    quote:
      "My skin has never looked this even. Three weeks in and the dark spots I've had for years are finally starting to fade. This is the real deal.",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3ukeM01J8FcyYvEWfOVOOuFVKgJZgZ6AEDA&s",
    name: "Jade R., 28, Austin",
    rating: 5,
  },
  {
    quote:
      "Lightweight, fragrance-free, and it actually works. I've recommended it to every friend who asks what I'm using these days.",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnmD2ane_vgy41AitlQ0YqwLtpSPxFjHfazQ&s",
    name: "Sofia P., 41, Miami",
    rating: 5,
  },
];

export default function Testimonials({
  eyebrow = "Real Rosaline Stories",
  testimonials = DEFAULT_TESTIMONIALS,
}) {
  const [index, setIndex] = useState(0);
  const active = testimonials[index];

  const goPrev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const goNext = () => setIndex((i) => (i + 1) % testimonials.length);

  return (
    <section className="rl-testimonials">
      <div className="rl-testimonials__frame">
        <span className="rl-about__eyebrow">
          {/* <span className="rl-testimonials__eyebrow-dot" /> */}
          {eyebrow}
        </span>

        <div className="rl-testimonials__body">
          <button type="button" className="rl-testimonials__nav rl-testimonials__nav--left" onClick={goPrev} aria-label="Previous story">
            <ArrowIcon direction="left" />
          </button>

          <blockquote className="rl-testimonials__quote">&ldquo;{active.quote}&rdquo;</blockquote>

          <button type="button" className="rl-testimonials__nav rl-testimonials__nav--right" onClick={goNext} aria-label="Next story">
            <ArrowIcon direction="right" />
          </button>
        </div>

        <div className="rl-testimonials__author">
          <img className="rl-testimonials__avatar" src={active.avatar} alt={active.name} />
          <span className="rl-testimonials__name">{active.name}</span>
          <div className="rl-testimonials__stars">
            {Array.from({ length: active.rating }).map((_, i) => (
              <StarIcon key={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}