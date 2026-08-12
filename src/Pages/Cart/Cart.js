import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Cart.css";
import ProductData from "../../Data/ProductData";
import product1 from "../../Assets/Products/product4.jpg";
import product2 from "../../Assets/Products/product5.jpg";
import product3 from "../../Assets/Products/product3.jpg";

function MinusIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M1 6H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M6 1V11M1 6H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function NoteIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <rect x="2.5" y="1.5" width="11" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M5 5.5H11M5 8.5H11M5 11.5H8.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M8 4.5V8L10.5 9.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DiscountIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <path d="M2 7L7 2H13.5V8.5L8.5 13.5C8 14 7.2 14 6.7 13.5L2 8.8C1.5 8.3 1.5 7.5 2 7Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <circle cx="9.7" cy="5.3" r="1" fill="currentColor" />
    </svg>
  );
}

function GiftBowIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <path
        d="M18 14v20M18 14c-3-4-9-4-9 0s6 4 9 0ZM18 14c3-4 9-4 9 0s-6 4-9 0Z"
        stroke="#6b4fd1"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <rect x="7" y="16" width="22" height="6" rx="1" stroke="#6b4fd1" strokeWidth="1.6" />
    </svg>
  );
}

function ChevronIcon({ direction = "left" }) {
  return (
    <svg width="9" height="14" viewBox="0 0 9 14" fill="none" style={{ transform: direction === "right" ? "scaleX(-1)" : undefined }}>
      <path d="M8 1L1.5 7L8 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StarIcon({ filled }) {
  return (
    <svg width="12" height="12" viewBox="0 0 20 20" fill={filled ? "currentColor" : "none"}>
      <path d="M10 1.5l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L1.3 7.8l6.1-.7L10 1.5Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
    </svg>
  );
}

const PAYMENT_METHODS = ["VISA", "DINERS", "MC", "stripe", "PayPal", "G Pay", "Pay"];

const DEFAULT_RECOMMENDED = [
  { badge: "New", image: product1, rating: 5, reviewCount: null, title: "Clear Skin Tonic", price: "₹22.00" },
  { badge: null, image: product2, rating: 3.5, reviewCount: null, title: "Botanical Radiance Serum", price: "₹14.00" },
  { badge: null, image: product3, rating: 4, reviewCount: null, title: "The Base Face Milk Essence", price: "₹42.00" },
  { badge: "New", image: product1, rating: 5, reviewCount: null, title: "Multivitamin Body Serum", price: "₹34.00" },
  { badge: null, image: product2, rating: 4.5, reviewCount: null, title: "Overnight Repair Oil", price: "₹28.00" },
  { badge: "New", image: product3, rating: 5, reviewCount: null, title: "Clay Detox Mask", price: "₹24.00" },
  { badge: null, image: product1, rating: 4, reviewCount: null, title: "Brightening Eye Cream", price: "₹30.00" },
  { badge: null, image: product2, rating: 4.5, reviewCount: null, title: "Rosewater Face Mist", price: "₹18.00" },
];

export default function Cart({
  items,
  freeShippingThreshold = 316,
  giftWrapPrice = 20,
  recommended = DEFAULT_RECOMMENDED,
  onCheckout,
}) {
  const [cartItems, setCartItems] = useState(items || ProductData);
  const [recPage, setRecPage] = useState(0);
  const perPage = 4;
  const totalPages = Math.ceil(recommended.length / perPage);

  const updateQuantity = (id, delta) => {
    setCartItems((list) =>
      list.map((it) => (it.id === id ? { ...it, quantity: Math.max(1, it.quantity + delta) } : it))
    );
  };

  const removeItem = (id) => {
    setCartItems((list) => list.filter((it) => it.id !== id));
  };

  const subtotal = cartItems.reduce((sum, it) => sum + it.price * it.quantity, 0);
  const originalSubtotal = cartItems.reduce((sum, it) => sum + (it.originalPrice || it.price) * it.quantity, 0);
  const saved = originalSubtotal - subtotal;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPct = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const visibleRecommended = recommended.slice(recPage * perPage, recPage * perPage + perPage);

  return (
    <div className="rl-cart-page">
      <div className="rl-cart-page__hero">
        <nav className="rl-cart-page__breadcrumb">
          <Link to="/">Home</Link>
          <span>›</span>
          <span>Cart</span>
        </nav>
        <h1 className="rl-cart-page__heading">Your Cart ({String(cartItems.length).padStart(2, "0")})</h1>
      </div>

      <div className="rl-cart-page__body">
        <div className="rl-cart-page__items">
          {cartItems.map((item) => (
            <div className="rl-cart-page__item" key={item.id}>
              <div className="rl-cart-page__item-thumb" style={{ backgroundImage: `url(${item.image})` }} />

              <div className="rl-cart-page__item-info">
                <h3 className="rl-cart-page__item-title">{item.title}</h3>
                <p className="rl-cart-page__item-size">Size: {item.size}</p>
                <div className="rl-cart-page__item-price">
                  <span className="rl-cart-page__item-price-sale">₹{item.price.toFixed(2)}</span>
                  {item.originalPrice && (
                    <span className="rl-cart-page__item-price-original">₹{item.originalPrice.toFixed(2)}</span>
                  )}
                </div>
              </div>

              <div className="rl-cart-page__item-qty">
                <div className="rl-cart-page__stepper">
                  <button type="button" onClick={() => updateQuantity(item.id, -1)} aria-label="Decrease quantity">
                    <MinusIcon />
                  </button>
                  <span>{item.quantity}</span>
                  <button type="button" onClick={() => updateQuantity(item.id, 1)} aria-label="Increase quantity">
                    <PlusIcon />
                  </button>
                </div>
                <button type="button" className="rl-cart-page__remove" onClick={() => removeItem(item.id)}>
                  Remove
                </button>
              </div>

              <div className="rl-cart-page__item-total">₹{(item.price * item.quantity).toFixed(2)}</div>
            </div>
          ))}

          {cartItems.length === 0 && <p className="rl-cart-page__empty">Your cart is empty.</p>}
        </div>

        <div className="rl-cart-page__summary">
          <div className="rl-cart-page__shipping">
            {remainingForFreeShipping > 0 ? (
              <p>Spend ₹{remainingForFreeShipping.toFixed(2)} more for free shipping</p>
            ) : (
              <p>You've unlocked free shipping!</p>
            )}
            <div className="rl-cart-page__progress">
              <div className="rl-cart-page__progress-fill" style={{ width: `${progressPct}%` }} />
            </div>
          </div>

          <div className="rl-cart-page__gift">
            <GiftBowIcon />
            <div>
              <h4>Buying for a loved one?</h4>
              <p>Send personalized message on card along with a gift wrapper at ₹{giftWrapPrice}</p>
              <button type="button" className="rl-cart-page__gift-link">
                Add Gift Wrap
              </button>
            </div>
          </div>

          <div className="rl-cart-page__pills">
            <button type="button">
              <NoteIcon /> Order note
            </button>
            <button type="button">
              <TruckIcon /> Estimate shipping
            </button>
            <button type="button">
              <DiscountIcon /> Discount
            </button>
          </div>

          <div className="rl-cart-page__total-row">
            <span>Estimated total</span>
            <span>
              ₹{subtotal.toFixed(2)}
              {saved > 0 && <span className="rl-cart-page__total-original">₹{originalSubtotal.toFixed(2)}</span>}
            </span>
          </div>
          {saved > 0 && <p className="rl-cart-page__saved">You've saved ₹{saved.toFixed(0)} USD!</p>}

          <button type="button" className="rl-cart-page__checkout-btn" onClick={onCheckout}>
            {onCheckout ? "Check Out" : <Link to="/checkout">Check Out</Link>}
          </button>
          <p className="rl-cart-page__tax-note">Tax and shipping calculated at checkout</p>

          <div className="rl-cart-page__payments">
            {PAYMENT_METHODS.map((p) => (
              <span className="rl-cart-page__payment-chip" key={p}>
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="rl-cart-page__recommended">
        <div className="rl-cart-page__recommended-header">
          <h2>You May Also Like</h2>
          <div className="rl-cart-page__recommended-nav">
            <button
              type="button"
              onClick={() => setRecPage((p) => Math.max(0, p - 1))}
              disabled={recPage === 0}
              aria-label="Previous products"
            >
              <ChevronIcon direction="left" />
            </button>
            <span>
              {recPage + 1} / {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setRecPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={recPage === totalPages - 1}
              aria-label="Next products"
            >
              <ChevronIcon direction="right" />
            </button>
          </div>
        </div>

        <div className="rl-cart-page__recommended-grid">
          {visibleRecommended.map((p) => (
            <div className="rl-cart-page__rec-card" key={p.title}>
              <div className="rl-cart-page__rec-image" style={{ backgroundImage: `url(${p.image})` }}>
                {p.badge && <span className="rl-cart-page__rec-badge">{p.badge}</span>}
              </div>
              <div className="rl-cart-page__rec-rating">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} filled={i < Math.round(p.rating)} />
                ))}
                <span>{p.rating.toFixed(1)}</span>
              </div>
              <h4 className="rl-cart-page__rec-title">{p.title}</h4>
              <p className="rl-cart-page__rec-price">{p.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}