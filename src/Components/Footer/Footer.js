import React, { useState } from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import logo from "../../Assets/Logo/footer-logo.png"
import { FaEnvelope, FaFacebookF, FaPhoneAlt, FaYoutube } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaXTwitter, FaLinkedinIn, FaLocationDot } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";

function FingerprintIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
      <path
        d="M17 6a11 11 0 0 1 11 11m-22 0A11 11 0 0 1 17 6M12 27a11 11 0 0 1-2.6-7M24.6 20A11 11 0 0 1 22 27M17 10a7 7 0 0 1 7 7M10 17a7 7 0 0 1 7-7M14 27.5c-1.5-2.4-2.3-5.4-2.3-8.5a5.3 5.3 0 0 1 10.6 0c0 1.3-.15 2.5-.4 3.6M17 13.5a3.5 3.5 0 0 1 3.5 3.5c0 2.6-.4 5-1.1 7.2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BoxIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
      <path
        d="M17 4 5 9.5 17 15 29 9.5 17 4Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M5 9.5V24l12 5.5 12-5.5V9.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M17 15v14.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function LeafIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
      <path
        d="M8 26C6 17 12 6 27 6c1 12-8 20-19 20Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M27 6 8 26" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function StarIconOutline() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
      <path
        d="M17 4l4.4 9.5 10.3 1.2-7.7 7.1 2 10.2L17 27l-9 5 2-10.2-7.7-7.1 10.3-1.2L17 4Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SocialIcon({ type }) {
  const common = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "currentColor" };
  switch (type) {
    case "facebook":
      return (
        <FaFacebookF />
      );
    case "instagram":
      return (
        <AiFillInstagram />
      );
    case "twitter":
      return (
        <FaXTwitter />
      );
    case "youtube":
      return (
        <FaYoutube />
      );
    case "linkedin":
      return (
        <FaLinkedinIn />
      );
    default:
      return null;
  }
}

function ChevronUpIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2.5 10L8 4.5L13.5 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const TRUST_BADGES = [
  { icon: FingerprintIcon, title: "Secure Checkout", subtitle: "Your data is always protected." },
  { icon: BoxIcon, title: "Free Returns", subtitle: "30-day money-back guarantee." },
  { icon: LeafIcon, title: "Eco Packaging", subtitle: "Sustainably designed bottles." },
  { icon: StarIconOutline, title: "10,000+ Reviews", subtitle: "Trusted by glow-seekers worldwide." },
];

const SHOP_LINKS = [
  { title: "Home", link: "/" },
  { title: "Product", link: "product" },
  { title: "About", link: "about" },
  // { title: "Contact", link: "contact" },
];
const HELP_LINKS = [
  { title: "Contact Us", link: "contact" },
  { title: "Shipping & Returns", link: "shipping-&-return" },
  { title: "Privacy Policy", link: "privacy-policy" },
  { title: "Terms & Conditions", link: "term-&-condition" },
];
const SOCIALS = [
  {
    title: "facebook",
    link: "https://www.facebook.com/share/198s98zUAS/?mibextid=wwXIfr"
  },
  {
    title: "instagram",
    link: "https://www.instagram.com/flucke_luxuryskincare?igsh=MXM3bGhycjlrbDl4Nw=="
  },
  {
    title: "twitter",
    link: ""
  },
  {
    title: "youtube",
    link: ""
  },
];

export default function Footer({
  marqueeText = "Powered by Science & Nature. Smart Skincare, Powered by Science.",
  phone = "+91 8766226077",
  email = "fluckeskincare@gmail.com",
  copyright = "© 2026 Flucke Luxury Skincare. All rights reserved.",
  onSubscribe,
  onScrollTop,
}) {
  const [subscribeEmail, setSubscribeEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    onSubscribe && onSubscribe(subscribeEmail);
  };

  const handleScrollTop = () => {
    if (onScrollTop) {
      onScrollTop();
    } else if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="rl-footer">
      {/* <div className="rl-footer__trust">
        {TRUST_BADGES.map(({ icon: Icon, title, subtitle }) => (
          <div className="rl-footer__trust-item" key={title}>
            <span className="rl-footer__trust-icon">
              <Icon />
            </span>
            <h3 className="rl-footer__trust-title">{title}</h3>
            <p className="rl-footer__trust-subtitle">{subtitle}</p>
          </div>
        ))}
      </div> */}

      <div className="rl-footer__panel">
        <div className="rl-footer__marquee">
          <div className="rl-footer__marquee-track">
            <span className="rl-footer__marquee-text">{marqueeText}</span>
            <span className="rl-footer__marquee-text" aria-hidden="true">
              {marqueeText}
            </span>
          </div>
        </div>

        <div className="rl-footer__columns">
          <div className="rl-footer__col">
            <h4 className="rl-footer__col-heading">Contact Us</h4>
            <ul className="rl-footer__link-list">
              <li>
                <a className="rl-footer__col-link" href={`tel:${phone.replace(/[^\d+]/g, "")}`}>
                  <FaPhoneAlt />{phone}
                </a>
              </li>
              <li>
                <a className="rl-footer__col-link" href={`mailto:${email}`}>
                  <FaEnvelope /> {email}
                </a>
              </li>
              <li>
                <a className="rl-footer__col-link">
                  <FaLocationDot /> Laxmi Nagar, New Delhi 110092
                </a>
              </li>
            </ul>
          </div>


          <div className="rl-footer__col">
            <h4 className="rl-footer__col-heading">Shop</h4>
            <ul className="rl-footer__link-list">
              {SHOP_LINKS.map((l) => (
                <li key={l}>
                  <Link to={l.link}>{l.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rl-footer__col">
            <h4 className="rl-footer__col-heading">Help</h4>
            <ul className="rl-footer__link-list">
              {HELP_LINKS.map((l) => (
                <li key={l}>
                  <Link to={l.link}>{l.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rl-footer__col rl-footer__col--newsletter">
            {/* <h4 className="rl-footer__col-heading">About</h4> */}
            <img className="footer_logo" src={logo} alt="" />
            <p className="rl-footer__newsletter-text">At FLUCKE Luxury Skincare, we are dedicated to providing premium beauty and skincare products that deliver maximum results. Our formulations are crafted with the finest ingredients to ensure visible improvements and healthy, radiant skin for your clients.</p>
            {/* <form className="rl-footer__newsletter-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                className="rl-footer__newsletter-input"
                placeholder="Email address"
                value={subscribeEmail}
                onChange={(e) => setSubscribeEmail(e.target.value)}
                required
              />
              <button type="submit" className="rl-footer__newsletter-btn">
                Subscribe
              </button>
            </form> */}
          </div>
        </div>

        <div className="rl-footer__bottom">
          <div className="rl-footer__socials">
            {SOCIALS.map((s) => (
              <Link to={s.link} key={s} className="rl-footer__social-btn" aria-label={s}>
                <SocialIcon type={s.title} />
              </Link>
            ))}
          </div>
          <span className="rl-footer__copyright">{copyright}</span>
          <span className="rl-footer__copyright"> <Link to={"https://digitaldezire.com/"}>Dev By :- Digital Dezire</Link></span>
        </div>

        <button type="button" className="rl-footer__scroll-top" onClick={handleScrollTop} aria-label="Scroll to top">
          <ChevronUpIcon />
        </button>
      </div>
    </footer>
  );
}