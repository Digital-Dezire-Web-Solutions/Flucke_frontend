import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { FaFacebookF, FaYoutube } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";

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

const TopBar = () => {
  const OFFERS = [
    "🎉 Sale 50% OFF for New Users",
    "🚚 Free Shipping on Orders Above ₹999",
    "💳 Extra 10% OFF on Online Payment",
    "🎁 Buy 2 Get 1 Free",
  ];

  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(true);

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % OFFERS.length);
        setAnimate(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const SOCIALS = ["facebook", "instagram", "twitter", "youtube", "linkedin"];
  return (
    <div className='topbar'>
      <div className="rl-footer__bottom">
        <div className="rl-footer__socials">
          {SOCIALS.map((s) => (
            <a href="#!" key={s} className="rl-footer__social-btn" aria-label={s}>
              <SocialIcon type={s} />
            </a>
          ))}
        </div>
        <div className="offer-wrapper">
          <div className={`offer-slider ${animate ? "animate" : ""}`}>
            <div className="offer">{OFFERS[index]}</div>
            {/* <div className="offer">{OFFERS[(index + 1) % OFFERS.length]}</div> */}
          </div>
        </div>
        {/* <span className="rl-footer__copyright">Sale 50% off for new users</span> */}
        <span className="rl-footer__copyright call-item"> <Link to={"tel : +91 8766226077"}><IoCall /> +91 8766226077 </Link></span>
      </div>
    </div>
  )
}

export default TopBar
