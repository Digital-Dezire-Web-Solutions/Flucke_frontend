import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Cart.css";
import product1 from "../../Assets/Products/product4.jpg";
import product2 from "../../Assets/Products/product5.jpg";
import product3 from "../../Assets/Products/product3.jpg";
import LuxuryCta from "../../Components/LuxuryCta/LuxuryCta";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  updateCartQuantity,
} from "../../Redux/features/cart/cartSlice";
import {
  applyCoupon,
  clearCoupon,
} from "../../Redux/features/coupon/couponslice";

function MinusIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path
        d="M1 6H11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path
        d="M6 1V11M1 6H11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function NoteIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <rect
        x="2.5"
        y="1.5"
        width="11"
        height="13"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path
        d="M5 5.5H11M5 8.5H11M5 11.5H8.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M8 4.5V8L10.5 9.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DiscountIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <path
        d="M2 7L7 2H13.5V8.5L8.5 13.5C8 14 7.2 14 6.7 13.5L2 8.8C1.5 8.3 1.5 7.5 2 7Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
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
      <rect
        x="7"
        y="16"
        width="22"
        height="6"
        rx="1"
        stroke="#6b4fd1"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function ChevronIcon({ direction = "left" }) {
  return (
    <svg
      width="9"
      height="14"
      viewBox="0 0 9 14"
      fill="none"
      style={{ transform: direction === "right" ? "scaleX(-1)" : undefined }}
    >
      <path
        d="M8 1L1.5 7L8 13"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StarIcon({ filled }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 20 20"
      fill={filled ? "currentColor" : "none"}
    >
      <path
        d="M10 1.5l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L1.3 7.8l6.1-.7L10 1.5Z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const PAYMENT_METHODS = [
  "VISA",
  "G Pay",
  // "UPI",
  "PHONE PE",
  "PAYTM",
];

const DEFAULT_RECOMMENDED = [
  {
    badge: "New",
    image: product1,
    rating: 5,
    reviewCount: null,
    title: "Clear Skin Tonic",
    price: "₹22.00",
  },
  {
    badge: null,
    image: product2,
    rating: 3.5,
    reviewCount: null,
    title: "Botanical Radiance Serum",
    price: "₹14.00",
  },
  {
    badge: null,
    image: product3,
    rating: 4,
    reviewCount: null,
    title: "The Base Face Milk Essence",
    price: "₹42.00",
  },
  {
    badge: "New",
    image: product1,
    rating: 5,
    reviewCount: null,
    title: "Multivitamin Body Serum",
    price: "₹34.00",
  },
  {
    badge: null,
    image: product2,
    rating: 4.5,
    reviewCount: null,
    title: "Overnight Repair Oil",
    price: "₹28.00",
  },
  {
    badge: "New",
    image: product3,
    rating: 5,
    reviewCount: null,
    title: "Clay Detox Mask",
    price: "₹24.00",
  },
  {
    badge: null,
    image: product1,
    rating: 4,
    reviewCount: null,
    title: "Brightening Eye Cream",
    price: "₹30.00",
  },
  {
    badge: null,
    image: product2,
    rating: 4.5,
    reviewCount: null,
    title: "Rosewater Face Mist",
    price: "₹18.00",
  },
];

export default function Cart({
  items,
  recommended = DEFAULT_RECOMMENDED,
  onCheckout,
}) {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { appliedCoupon, loading, error } = useSelector(
    (state) => state.coupons,
  );
  const navigate = useNavigate();
  const [checkoutError, setCheckoutError] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [recPage, setRecPage] = useState(0);
  const perPage = 4;
  const totalPages = Math.ceil(recommended.length / perPage);
  const [sError, setError] = useState(null);

  const updateQuantity = (id, delta) => {
    dispatch(
      updateCartQuantity({
        id,
        delta,
      }),
    );
  };

  const removeItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.salePrice || item.price) * item.quantity,
    0,
  );
  const originalSubtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const saved = originalSubtotal - subtotal;

  const visibleRecommended = recommended.slice(
    recPage * perPage,
    recPage * perPage + perPage,
  );

  // useEffect(() => {
  //   dispatch(clearCoupon());
  // }, [subtotal, dispatch]);
  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;

    if (!token) {
      setError("Please login to apply coupon.");
      setTimeout(() => {
        setError(null);
      }, 3000);
      return;
    }

    try {
      await dispatch(
        applyCoupon({
          code: couponCode,
          amount: subtotal,
        }),
      ).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  const handleCheckout = () => {
    if (!token) {
      setCheckoutError("Please login to continue to checkout.");

      setTimeout(() => {
        setCheckoutError("");
      }, 3000);

      return;
    }

    navigate("/checkout");
  };

  return (
    <>
      <div className="rl-cart-page">
        <div className="rl-cart-page__hero">
          <nav className="rl-cart-page__breadcrumb">
            <Link to="/">Home</Link>
            <span>›</span>
            <span>Cart</span>
          </nav>
          <h1 className="rl-cart-page__heading">
            Your Cart ({String(cartItems.length).padStart(2, "0")})
          </h1>
        </div>

        <div className="rl-cart-page__body">
          <div className="rl-cart-page__items">
            {cartItems.map((item) => (
              <div className="rl-cart-page__item" key={item._id}>
                <div
                  className="rl-cart-page__item-thumb"
                  style={{
                    backgroundImage: `url(${item.images?.[0]})`,
                  }}
                />

                <div className="rl-cart-page__item-info">
                  <h3 className="rl-cart-page__item-title">{item.name}</h3>
                  <p className="rl-cart-page__item-size">Size: {item.size}</p>
                  <div className="rl-cart-page__item-price">
                    <span className="rl-cart-page__item-price-sale">
                      ₹{(item.salePrice || item.price).toFixed(2)}
                    </span>
                    {item.salePrice > 0 && (
                      <span className="rl-cart-page__item-price-original">
                        ₹{item.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="rl-cart-page__item-qty">
                  <div className="rl-cart-page__stepper">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item._id, -1)}
                      aria-label="Decrease quantity"
                    >
                      <MinusIcon />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item._id, 1)}
                      aria-label="Increase quantity"
                    >
                      <PlusIcon />
                    </button>
                  </div>
                  <button
                    type="button"
                    className="rl-cart-page__remove"
                    onClick={() => removeItem(item._id)}
                  >
                    Remove
                  </button>
                </div>

                <div className="rl-cart-page__item-total">
                  ₹{((item.salePrice || item.price) * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}

            {cartItems.length === 0 && (
              <p className="rl-cart-page__empty">Your cart is empty.</p>
            )}
          </div>

          <div className="rl-cart-page__summary">
            {/* <div className="rl-cart-page__shipping">
              {remainingForFreeShipping > 0 ? (
                <p>
                  Spend ₹{remainingForFreeShipping.toFixed(2)} more for free
                  shipping
                </p>
              ) : (
                <p>You've unlocked free shipping!</p>
              )}
              <div className="rl-cart-page__progress">
                <div
                  className="rl-cart-page__progress-fill"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div> */}

            <div className="rl-cart-page__gift">
              <div className="rl-cart-page__coupon" style={{ width: "100%" }}>
                <h4>Apply Coupon</h4>

                <div className="rl-footer__col rl-footer__col--newsletter">
                  {/* <h4 className="rl-footer__col-heading">About</h4> */}
                  <form className="rl-footer__newsletter-form" onSubmit={""}>
                    <input
                      type="text"
                      className="rl-footer__newsletter-input"
                      placeholder="Coupon Code"
                      value={couponCode}
                      onChange={(e) =>
                        setCouponCode(e.target.value.toUpperCase())
                      }
                    />

                    <button
                      className="rl-footer__newsletter-btn"
                      type="button"
                      onClick={handleApplyCoupon}
                      disabled={loading}
                    >
                      {loading ? "Applying..." : "Apply"}
                    </button>
                  </form>
                </div>

                {error && <p className="coupon-error">{error}</p>}
                {sError && <p className="coupon-error">{sError}</p>}

                {appliedCoupon && (
                  <p className="coupon-success">
                    Coupon "{appliedCoupon.coupon.code}" applied successfully.
                  </p>
                )}
              </div>
              {appliedCoupon && (
                <div className="rl-cart-page__total-row">
                  <span>Coupon Discount</span>

                  <span>-₹{appliedCoupon.discount.toFixed(2)}</span>
                </div>
              )}
              {appliedCoupon && (
                <button
                  type="button"
                  className="remove-coupon-btn"
                  onClick={() => {
                    dispatch(clearCoupon());
                    setCouponCode("");
                  }}
                >
                  Remove Coupon
                </button>
              )}

              {/* <GiftBowIcon />
              <div>
                <h4>Buying for a loved one?</h4>
                <p>
                  Send personalized message on card along with a gift wrapper at
                  ₹{giftWrapPrice}
                </p>
                <button type="button" className="rl-cart-page__gift-link">
                  Add Gift Wrap
                </button>
              </div> */}
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
                ₹{(appliedCoupon?.finalAmount ?? subtotal).toFixed(2)}
                {saved > 0 && (
                  <span className="rl-cart-page__total-original">
                    ₹{originalSubtotal.toFixed(2)}
                  </span>
                )}
              </span>
            </div>
            {saved > 0 && (
              <p className="rl-cart-page__saved">
                You've saved ₹{saved.toFixed(0)} USD!
              </p>
            )}

            <button
              type="button"
              className="rl-cart-page__checkout-btn"
              onClick={handleCheckout}
            >
              Check Out
            </button>
            {checkoutError && <p className="coupon-error">{checkoutError}</p>}
            <p className="rl-cart-page__tax-note">
              Tax and shipping calculated at checkout
            </p>

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
                onClick={() =>
                  setRecPage((p) => Math.min(totalPages - 1, p + 1))
                }
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
                <div
                  className="rl-cart-page__rec-image"
                  style={{ backgroundImage: `url(${p.image})` }}
                >
                  {p.badge && (
                    <span className="rl-cart-page__rec-badge">{p.badge}</span>
                  )}
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
      <LuxuryCta />
    </>
  );
}
