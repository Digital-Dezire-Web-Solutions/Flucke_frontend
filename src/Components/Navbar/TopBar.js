import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { FaFacebookF, FaYoutube } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { getCoupons } from '../../Redux/features/coupon/couponslice';

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

const DEFAULT_OFFERS = [
  "🚚 Free Shipping on Orders Above ₹999",
];

const TopBar = () => {
  const { coupons } = useSelector(
    (state) => state.coupons,
  );
  const dispatch = useDispatch();

  // Live offers built from active, non-expired coupons' offerText — falls
  // back to the static list when there's nothing to show yet (e.g. before
  // the fetch resolves, or if no coupon has offerText set).
  const OFFERS = useMemo(() => {
    const now = new Date();
    const live = (coupons || [])
      .filter(
        (c) =>
          c.active &&
          c.offerText &&
          (!c.expiryDate || new Date(c.expiryDate) > now),
      )
      .map((c) => c.offerText);

    return live.length ? live : DEFAULT_OFFERS;
  }, [coupons]);

  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(false);

  // Always holds the *current* OFFERS so the interval below (which only
  // runs once, on mount) never cycles through a stale array once coupons
  // finish loading.
  const offersRef = useRef(OFFERS);
  useEffect(() => {
    offersRef.current = OFFERS;
  }, [OFFERS]);

  // Reset to the first offer whenever the underlying list actually changes,
  // so we never end up pointing past the end of a shorter new list.
  useEffect(() => {
    setIndex(0);
  }, [OFFERS]);

  useEffect(() => {
    dispatch(getCoupons());
    const interval = setInterval(() => {
      setAnimate(true);

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % offersRef.current.length);
        setAnimate(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

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
  return (
    <div className='topbar'>
      <div className="rl-footer__bottom">
        <div className="rl-footer__socials">
          {SOCIALS.map((s) => (
            <a
              href={s.link}
              key={s.title}
              className="rl-footer__social-btn"
              aria-label={s.title}
              target="_blank"
              rel="noopener noreferrer"
            >
              <SocialIcon type={s.title} />
            </a>
          ))}
        </div>
        <div className="offer-wrapper">
          <div className={`offer-slider ${animate ? "animate" : ""}`}>
            <div className="offer">{OFFERS[index]}</div>
          </div>
        </div>
        <span className="rl-footer__copyright call-item">
          <a href="tel:+918766226077">
            <IoCall /> +91 8766226077
          </a>
        </span>
      </div>
    </div>
  )
}

export default TopBar