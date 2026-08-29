import React, { useCallback, useRef, useState } from "react";
import "./BeforeAfter.css";
import before from "../../Assets/BeforeAfter//before.jpg";
import after from "../../Assets/BeforeAfter/after.jpg";

const DEFAULT_CALLOUTS = [
  {
    side: "before",
    eyebrow: "Uneven Skin",
    label: "Dark Spots",
    top: 39,
    boxLeft: 29,
    boxWidth: 10,
    boxHeight: 16,
    textAlign: "right",
  },
  {
    side: "after",
    eyebrow: "Refined Texture",
    label: "Youthful Glow",
    top: 49,
    boxLeft: 58,
    boxWidth: 8,
    boxHeight: 13,
    textAlign: "left",
  },
];

export default function BeforeAfter({
  badge = "Real People, Real Rosaline",
  heading = "Visible Change You Can Trust",
  beforeImage = before,
  afterImage = after,
  beforeLabel = "Before",
  afterLabel = "After (14 Days)",
  callouts = DEFAULT_CALLOUTS,
  initialPosition = 50,
}) {
  const [position, setPosition] = useState(initialPosition);
  const containerRef = useRef(null);
  const draggingRef = useRef(false);

  const updateFromClientX = useCallback((clientX) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const ratio = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, ratio)));
  }, []);

  const handlePointerDown = (e) => {
    draggingRef.current = true;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    updateFromClientX(e.clientX);
  };

  const handlePointerMove = (e) => {
    if (!draggingRef.current) return;
    updateFromClientX(e.clientX);
  };

  const stopDragging = () => {
    draggingRef.current = false;
  };

  const step = (delta) => {
    setPosition((p) => Math.min(100, Math.max(0, p + delta)));
  };

  return (
    <section className="rl-before-after">
      <div className="rl-before-after__main">
      <div className="rl-before-after__intro">
        <span className="rl-before-after__badge">{badge}</span>
        <h2 className="rl-before-after__heading">{heading}</h2>
      </div>

      <div
        className="rl-before-after__frame"
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        onPointerLeave={stopDragging}
      >
        <div
          className="rl-before-after__image rl-before-after__image--before"
          style={{ backgroundImage: `url(${beforeImage})` }}
        />

        <div
          className="rl-before-after__image rl-before-after__image--after"
          style={{
            backgroundImage: `url(${afterImage})`,
            clipPath: `inset(0 0 0 ${position}%)`,
          }}
        />

        {callouts.map((c) => (
          <div
            key={c.label}
            className={`rl-before-after__callout rl-before-after__callout--${c.textAlign}`}
            style={{
              top: `${c.top}%`,
              left: `${c.boxLeft}%`,
              width: `${c.boxWidth}%`,
              height: `${c.boxHeight}%`,
            }}
          >
            <span className="rl-before-after__callout-dot rl-before-after__callout-dot--top" />
            <span className="rl-before-after__callout-dot rl-before-after__callout-dot--bottom" />
            <div className="rl-before-after__callout-text">
              <span className="rl-before-after__callout-eyebrow">
                {c.eyebrow}
              </span>
              <span className="rl-before-after__callout-label">{c.label}</span>
            </div>
          </div>
        ))}

        <div
          className="rl-before-after__divider"
          style={{ left: `${position}%` }}
        >
          <div className="rl-before-after__handle">
            <button
              type="button"
              className="rl-before-after__nudge rl-before-after__nudge--left"
              aria-label="Show less after"
              onClick={() => step(-5)}
            >
              ◂
            </button>
            <button
              type="button"
              className="rl-before-after__nudge rl-before-after__nudge--right"
              aria-label="Show more after"
              onClick={() => step(5)}
            >
              ▸
            </button>
          </div>
        </div>

        <span className="rl-before-after__tag rl-before-after__tag--before">
          {beforeLabel}
        </span>
        <span className="rl-before-after__tag rl-before-after__tag--after">
          {afterLabel}
        </span>
      </div>
      </div>
    </section>
  );
}
