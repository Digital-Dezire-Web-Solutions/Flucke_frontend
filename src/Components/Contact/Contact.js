import React, { useState } from "react";
import "./Contact.css";

const DEFAULT_INFO_CARDS = [
  {
    title: "Email",
    lines: ["fluckeskincare@gmail.com"],
  },
  {
    title: "Customer Support",
    lines: ["Monday – Saturday", "10:00 AM – 6:00 PM"],
  },
  {
    title: "WhatsApp/Call",
    lines: ["+91 8766226077"],
    link: { label: "Visit Amazon Store →", href: "#!" },
  },
];

export default function Contact({
  eyebrow = "Get In Touch",
  heading = "We'd Love To Hear From You",
  subheading = "Have questions about our products? Contact our team and we'll be happy to assist you.",
  infoCards = DEFAULT_INFO_CARDS,
  submitLabel = "Send Inquiry",
  onSubmit,
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit && onSubmit(form);
  };

  return (
    <section className="rl-contact">
      <div className="rl-contact__intro">
        <span className="rl-contact__eyebrow">{eyebrow}</span>
        <h2 className="rl-contact__heading">{heading}</h2>
        <p className="rl-contact__subheading">{subheading}</p>
      </div>

      <div className="rl-contact__layout">
        <form className="rl-contact__form" onSubmit={handleSubmit}>
          <input
            className="rl-contact__input"
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange("name")}
            required
          />
          <input
            className="rl-contact__input"
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange("email")}
            required
          />
          <input
            className="rl-contact__input"
            type="tel"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange("phone")}
          />
          <textarea
            className="rl-contact__input rl-contact__textarea"
            placeholder="Write Your Message"
            value={form.message}
            onChange={handleChange("message")}
            required
          />

          <button type="submit" className="rl-contact__submit">
            {submitLabel}
          </button>
        </form>

        <div className="rl-contact__info">
          {infoCards.map((card) => (
            <div className="rl-contact__info-card" key={card.title}>
              <h3 className="rl-contact__info-title">{card.title}</h3>
              {card.lines.map((line) => (
                <p className="rl-contact__info-line" key={line}>
                  {line}
                </p>
              ))}
              {card.link && (
                <a className="rl-contact__info-link" href={card.link.href}>
                  {card.link.label}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
