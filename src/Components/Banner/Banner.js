import React from "react";
import "./Banner.css";
import posterImage from "../../Assets/Banner/fbanner.jpg";
import bgVideo from "../../Assets/Banner/banner.mp4";
import { PiSparkle } from "react-icons/pi";

export default function Banner({
  eyebrow = "High-Performance Skincare",
  headline = ["Serious Care", "Sleek Results"],
  subheading = "Potent actives, clean formulas, clinically proven radiance.",
  ctaLabel = "Shop From Amazon",
  ctaHref = "#!",
  videoUrl = bgVideo,
  posterUrl = posterImage, // shown while the video loads / if it fails to play
  features = [
    { prefix: "Formulated with", highlight: "Pure Actives" },
    { prefix: "Daily ritual", highlight: "Maximum Glow" },
    { prefix: "No compromise", highlight: "Clean Beauty" },
  ],
}) {
  return (
    <section className="rl-banner">
      {videoUrl && (
        <video
          className="rl-banner__video"
          src={videoUrl}
          poster={posterUrl}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      )}

      <div className="rl-banner__scrim" />

      <div className="rl-banner__content">
        <span className="rl-banner__eyebrow">{eyebrow}</span>

        <h1 className="rl-banner__headline">
          {headline.map((line) => (
            <span className="rl-banner__headline-line" key={line}>
              {line}
            </span>
          ))}
        </h1>

        <p className="rl-banner__subheading">{subheading}</p>

        <a className="rl-banner__cta" href={ctaHref}>
          <PiSparkle />
          {ctaLabel}
        </a>
      </div>

      <ul className="rl-banner__features">
        {features.map((f) => (
          <li key={f.highlight}>
            <span className="rl-banner__feature-prefix">{f.prefix}</span>{" "}
            <span className="rl-banner__feature-highlight">{f.highlight}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}