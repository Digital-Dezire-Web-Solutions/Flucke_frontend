import React, { useState } from "react";
import "./Contact.css";
import api from "../../Redux/services/api";

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
    link: {
      label: "Visit Amazon Store →",
      href: "https://www.amazon.in/s?k=Flucke&ref=bl_dp_s_web_0",
    },
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
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // { type: "success" | "error", message }

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);

    try {
      if (onSubmit) {
        // Let a parent override this entirely if it wants to handle
        // submission itself — otherwise fall through to the default API call.
        await onSubmit(form);
      } else {
        const { data } = await api.post("/contact", form);
        if (!data.success) {
          throw new Error(data.message || "Could not send your message.");
        }
      }

      setStatus({
        type: "success",
        message: "Thanks! Your message has been sent — we'll get back to you soon.",
      });
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setStatus({
        type: "error",
        message:
          err?.response?.data?.message ||
          err?.message ||
          "Something went wrong. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
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

          {status && (
            <p
              className={`rl-contact__status rl-contact__status--${status.type}`}
            >
              {status.message}
            </p>
          )}

          <button
            type="submit"
            className="rl-contact__submit"
            disabled={submitting}
          >
            {submitting ? "Sending…" : submitLabel}
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
                <a
                  className="rl-contact__info-link"
                  href={card.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
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