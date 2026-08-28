import React, { useEffect, useState } from "react";
import "./Checkout.css";
import ProductData from "../../Data/ProductData";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../Redux/features/order/orderSlice";
import { clearCart } from "../../Redux/features/cart/cartSlice";
import { clearCoupon } from "../../Redux/features/coupon/couponslice";
import { useNavigate } from "react-router-dom";
import LuxuryCta from "../../Components/LuxuryCta/LuxuryCta";

const EXPRESS_METHODS = [
  {
    id: "paypal",
    label: "PayPal",
    className: "rl-checkout__express-btn--paypal",
  },
  {
    id: "shoppay",
    label: "Shop Pay",
    className: "rl-checkout__express-btn--shoppay",
  },
  {
    id: "applepay",
    label: "Apple Pay",
    className: "rl-checkout__express-btn--applepay",
  },
  {
    id: "googlepay",
    label: "G Pay",
    className: "rl-checkout__express-btn--googlepay",
  },
];

const FOOTER_LINKS = [
  "Refund policy",
  "Shipping",
  "Privacy policy",
  "Terms of service",
  "Legal notice",
  "Contact",
];

export default function Checkout({ taxAmount = 2.0, onPlaceOrder }) {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { appliedCoupon } = useSelector((state) => state.coupons);
  const defaultAddress =
    user?.addresses?.find((a) => a.isDefault) || user?.addresses?.[0];

  const [selectedAddress, setSelectedAddress] = useState(defaultAddress);
  const [billingSame, setBillingSame] = useState(true);
  const [form, setForm] = useState({
    email: user?.email || "",
    name: user?.name || "",
    phone: user?.phone || "",
    country: "India",
    city: "",
    state: "",
    zip: "",
    address: "",
  });

  useEffect(() => {
    if (!selectedAddress) return;

    setForm((prev) => ({
      ...prev,
      name: selectedAddress.name,
      phone: selectedAddress.phone,
      address: selectedAddress.house,
      city: selectedAddress.city,
      state: selectedAddress.state,
      zip: selectedAddress.pincode,
      country: selectedAddress.country,
    }));
  }, [selectedAddress]);

  const handleField = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.salePrice || item.price) * item.quantity,
    0,
  );

  const itemDiscount = cartItems.reduce(
    (sum, item) =>
      sum + (item.price - (item.salePrice || item.price)) * item.quantity,
    0,
  );

  const couponDiscount = appliedCoupon?.discount || 0;

  const grandTotal = subtotal - couponDiscount + taxAmount;

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }

    const orderData = {
      products: cartItems.map((item) => ({
        product: item._id,
        quantity: item.quantity,
        price: item.price,
      })),

      shippingAddress: {
        fullName: selectedAddress?.name,
        phone: selectedAddress?.phone,
        area: selectedAddress?.area,
        city: selectedAddress?.city,
        state: selectedAddress?.state,
        country: selectedAddress?.country,
        pincode: selectedAddress?.pincode,
      },

      paymentMethod: "COD",

      couponCode: appliedCoupon?.coupon?.code || "",
    };

    try {
      await dispatch(createOrder(orderData)).unwrap();

      dispatch(clearCart());
      dispatch(clearCoupon());

      alert("Order placed successfully.");

      navigate("/account");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <div className="rl-checkout">
        <form className="rl-checkout__main" onSubmit={handlePlaceOrder}>
          <h2 className="rl-checkout__express-heading">Express checkout</h2>

          <section className="rl-checkout__section">
            <div className="rl-checkout__section-header">
              <h3>Contact</h3>
              {!user?.email && (
                <button type="button" className="rl-checkout__link-btn">
                  Sign in
                </button>
              )}
            </div>
            <label className="rl-checkout__label">Your email*</label>
            <input
              className="rl-checkout__input"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleField("email")}
              required
            />
            {/* <label className="rl-checkout__checkbox">
            <input type="checkbox" />
            Sign up for exclusive offers, expert tips and daily inspiration
          </label> */}
          </section>

          <section className="rl-checkout__section">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <h3>Select Address</h3>

              <button
                type="button"
                className="rl-checkout__link-btn"
                onClick={() => navigate("/account")}
              >
                + Add Address
              </button>
            </div>

            {user?.addresses?.length ? (
              user.addresses.map((address) => (
                <label key={address._id} className="checkout-address-card">
                  <input
                    type="radio"
                    name="address"
                    checked={selectedAddress?._id === address._id}
                    onChange={() => setSelectedAddress(address)}
                  />

                  <div>
                    <strong>{address.name}</strong>

                    <p>
                      {address.area}
                    </p>

                    <p>
                      {address.city}, {address.state} - {address.pincode}
                    </p>

                    <p>{address.phone}</p>

                    {address.isDefault && (
                      <span className="default-badge">Default</span>
                    )}
                  </div>
                </label>
              ))
            ) : (
              <div className="checkout-no-address">
                <p>No saved address found.</p>

                <button
                  type="button"
                  className="rl-checkout__link-btn"
                  onClick={() => navigate("/account")}
                >
                  Add Address
                </button>
              </div>
            )}
          </section>

          {/* <section className="rl-checkout__section">
            <h3>Delivery</h3>
            <input
              className="rl-checkout__input"
              placeholder="Full Name"
              value={form.name}
              onChange={handleField("name")}
            />
            <input
              className="rl-checkout__input"
              placeholder="Phone number"
              value={form.phone}
              onChange={handleField("phone")}
            />
            <select
              className="rl-checkout__input rl-checkout__select"
              value={form.country}
              onChange={handleField("country")}
            >
              <option value="">Country</option>
              <option value="IN">India</option>
              <option value="US">United States</option>
              <option value="UK">United Kingdom</option>
            </select>
            <div className="rl-checkout__grid-3">
              <input
                className="rl-checkout__input"
                placeholder="City"
                value={form.city}
                onChange={handleField("city")}
              />
              <input
                className="rl-checkout__input"
                placeholder="State"
                value={form.state}
                onChange={handleField("state")}
              />
              <input
                className="rl-checkout__input"
                placeholder="ZIP Code"
                value={form.zip}
                onChange={handleField("zip")}
              />
            </div>
            <input
              className="rl-checkout__input"
              placeholder="Address"
              value={form.address}
              onChange={handleField("address")}
            />
            <label className="rl-checkout__checkbox">
              <input type="checkbox" />
              Text me with news and offers
            </label>
          </section> */}

          <section className="rl-checkout__section">
            <h3>Shipping methods</h3>
            <div className="rl-checkout__placeholder-box">
              Enter your shipping address to view available shipping methods
            </div>
          </section>
          <section className="rl-checkout__section">
            <h3>Billing address</h3>
            <button
              type="button"
              className={`rl-checkout__radio-row rl-checkout__payment-option ${billingSame ? "rl-checkout__payment-option--active" : ""}`}
              onClick={() => setBillingSame(true)}
            >
              <span
                className={`rl-checkout__radio ${billingSame ? "rl-checkout__radio--checked" : ""}`}
              />
              Same as shipping address
            </button>
            <button
              type="button"
              className={`rl-checkout__radio-row rl-checkout__payment-option ${!billingSame ? "rl-checkout__payment-option--active" : ""}`}
              onClick={() => setBillingSame(false)}
            >
              <span
                className={`rl-checkout__radio ${!billingSame ? "rl-checkout__radio--checked" : ""}`}
              />
              Use a different billing address
            </button>
          </section>

          <button type="submit" className="rl-checkout__place-order">
            Place Order
          </button>

          <div className="rl-checkout__footer-links">
            {FOOTER_LINKS.map((l) => (
              <a href="#!" key={l}>
                {l}
              </a>
            ))}
          </div>
        </form>

        <aside className="rl-checkout__summary">
          {cartItems.map((item, i) => (
            <div className="rl-checkout__summary-item" key={item.id}>
              <div
                className="rl-checkout__summary-thumb"
                style={{
                  backgroundImage: `url(${item.images?.[0] || ""})`,
                }}
              >
                <span className="rl-checkout__summary-qty-badge">{i + 1}</span>
              </div>
              <div className="rl-checkout__summary-info">
                <h4>{item.name}</h4>
                <p>Size: {item.size}</p>
              </div>
              <div className="rl-checkout__summary-price">
                {item.salePrice > 0 && (
                  <span className="rl-checkout__summary-price-original">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </span>
                )}
                <span
                  className={
                    item.originalPrice ? "rl-checkout__summary-price-sale" : ""
                  }
                >
                  ₹{((item.salePrice || item.price) * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          ))}

          {appliedCoupon && (
            <div className="rl-checkout__discount-row">
              <strong>Coupon Applied :{appliedCoupon.coupon.code}</strong>
            </div>
          )}

          <div className="rl-checkout__totals">
            <div className="rl-checkout__totals-row">
              <span>
                Subtotal ({cartItems.reduce((s, it) => s + it.quantity, 0)}{" "}
                items)
              </span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="rl-checkout__totals-row">
              <span>Shipping</span>
              <span className="rl-checkout__free">FREE</span>
            </div>
            <div className="rl-checkout__totals-row">
              <span>Discount</span>
              <span className="rl-checkout__discount-value">
                -₹{couponDiscount.toFixed(2)}
              </span>
            </div>
            <p className="rl-checkout__discount-breakdown">
              Discount on items: -₹{itemDiscount.toFixed(2)}
              Coupon:
              {appliedCoupon?.coupon?.code || "None"}
              (-₹{couponDiscount.toFixed(2)})
            </p>
          </div>

          <div className="rl-checkout__grand-total">
            <span>Total</span>
            <span>₹{grandTotal.toFixed(2)}</span>
          </div>
          <p className="rl-checkout__tax-note">
            Including ₹{taxAmount.toFixed(2)} in taxes
          </p>
        </aside>
      </div>
      <LuxuryCta />
    </>
  );
}
