import React, { useState } from "react";
import "./Checkout.css";
import ProductData from "../../Data/ProductData";


const EXPRESS_METHODS = [
  { id: "paypal", label: "PayPal", className: "rl-checkout__express-btn--paypal" },
  { id: "shoppay", label: "Shop Pay", className: "rl-checkout__express-btn--shoppay" },
  { id: "applepay", label: "Apple Pay", className: "rl-checkout__express-btn--applepay" },
  { id: "googlepay", label: "G Pay", className: "rl-checkout__express-btn--googlepay" },
];

const FOOTER_LINKS = ["Refund policy", "Shipping", "Privacy policy", "Terms of service", "Legal notice", "Contact"];

export default function Checkout({ items = ProductData, taxAmount = 2.0, onPlaceOrder }) {
  const [deliveryMethod, setDeliveryMethod] = useState("ship");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [billingSame, setBillingSame] = useState(true);
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(40);
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    country: "",
    city: "",
    state: "",
    zip: "",
    address: "",
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  const handleField = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const subtotal = items.reduce((sum, it) => sum + it.price * it.quantity, 0);
  const itemDiscount = items.reduce(
    (sum, it) => sum + ((it.originalPrice || it.price) - it.price) * it.quantity,
    0
  );
  // subtotal already reflects each item's sale price; appliedDiscount is
  // the separate discount-code amount subtracted at checkout.
  const grandTotal = subtotal - appliedDiscount + taxAmount;

  const handleApplyDiscount = () => {
    if (discountCode.trim()) setAppliedDiscount((d) => d || 5);
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    onPlaceOrder && onPlaceOrder({ ...form, deliveryMethod, paymentMethod, billingSame });
  };

  return (
    <div className="rl-checkout">
      <form className="rl-checkout__main" onSubmit={handlePlaceOrder}>
        <h2 className="rl-checkout__express-heading">Express checkout</h2>

        {/* <div className="rl-checkout__express-row">
          {EXPRESS_METHODS.map((m) => (
            <button type="button" key={m.id} className={`rl-checkout__express-btn ${m.className}`}>
              {m.label}
            </button>
          ))}
        </div>

        <div className="rl-checkout__divider">
          <span>OR</span>
        </div> */}

        <section className="rl-checkout__section">
          <div className="rl-checkout__section-header">
            <h3>Contact</h3>
            <button type="button" className="rl-checkout__link-btn">
              Sign in
            </button>
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
          <label className="rl-checkout__checkbox">
            <input type="checkbox" />
            Sign up for exclusive offers, expert tips and daily inspiration
          </label>
        </section>


        <section className="rl-checkout__section">
          <h3>Delivery</h3>
          <div className="rl-checkout__grid-2">
            <input
              className="rl-checkout__input"
              placeholder="First name"
              value={form.firstName}
              onChange={handleField("firstName")}
            />
            <input
              className="rl-checkout__input"
              placeholder="Last name"
              value={form.lastName}
              onChange={handleField("lastName")}
            />
          </div>
          <input
            className="rl-checkout__input"
            placeholder="Phone number"
            value={form.phone}
            onChange={handleField("phone")}
          />
          <select className="rl-checkout__input rl-checkout__select" value={form.country} onChange={handleField("country")}>
            <option value="">Country</option>
            <option value="IN">India</option>
            <option value="US">United States</option>
            <option value="UK">United Kingdom</option>
          </select>
          <div className="rl-checkout__grid-3">
            <input className="rl-checkout__input" placeholder="City" value={form.city} onChange={handleField("city")} />
            <input className="rl-checkout__input" placeholder="State" value={form.state} onChange={handleField("state")} />
            <input className="rl-checkout__input" placeholder="ZIP Code" value={form.zip} onChange={handleField("zip")} />
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
        </section>

        <section className="rl-checkout__section">
          <h3>Shipping methods</h3>
          <div className="rl-checkout__placeholder-box">Enter your shipping address to view available shipping methods</div>
        </section>

        {/* <section className="rl-checkout__section">
          <h3>Payment</h3>
          <div className={`rl-checkout__payment-option ${paymentMethod === "card" ? "rl-checkout__payment-option--active" : ""}`}>
            <button type="button" className="rl-checkout__radio-row" onClick={() => setPaymentMethod("card")}>
              <span className={`rl-checkout__radio ${paymentMethod === "card" ? "rl-checkout__radio--checked" : ""}`} />
              Credit or debit card
            </button>

            {paymentMethod === "card" && (
              <div className="rl-checkout__card-fields">
                <input
                  className="rl-checkout__input"
                  placeholder="1234 4568 9012 3456"
                  value={form.cardNumber}
                  onChange={handleField("cardNumber")}
                />
                <input
                  className="rl-checkout__input"
                  placeholder="Name on card"
                  value={form.cardName}
                  onChange={handleField("cardName")}
                />
                <div className="rl-checkout__grid-2">
                  <input
                    className="rl-checkout__input"
                    placeholder="MM/YY"
                    value={form.expiry}
                    onChange={handleField("expiry")}
                  />
                  <input className="rl-checkout__input" placeholder="123" value={form.cvv} onChange={handleField("cvv")} />
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            className={`rl-checkout__radio-row rl-checkout__payment-option ${paymentMethod === "paypal" ? "rl-checkout__payment-option--active" : ""}`}
            onClick={() => setPaymentMethod("paypal")}
          >
            <span className={`rl-checkout__radio ${paymentMethod === "paypal" ? "rl-checkout__radio--checked" : ""}`} />
            PayPal
          </button>

          <button
            type="button"
            className={`rl-checkout__radio-row rl-checkout__payment-option ${paymentMethod === "applepay" ? "rl-checkout__payment-option--active" : ""}`}
            onClick={() => setPaymentMethod("applepay")}
          >
            <span className={`rl-checkout__radio ${paymentMethod === "applepay" ? "rl-checkout__radio--checked" : ""}`} />
            Apple Pay
          </button>
        </section> */}

        <section className="rl-checkout__section">
          <h3>Billing address</h3>
          <button
            type="button"
            className={`rl-checkout__radio-row rl-checkout__payment-option ${billingSame ? "rl-checkout__payment-option--active" : ""}`}
            onClick={() => setBillingSame(true)}
          >
            <span className={`rl-checkout__radio ${billingSame ? "rl-checkout__radio--checked" : ""}`} />
            Same as shipping address
          </button>
          <button
            type="button"
            className={`rl-checkout__radio-row rl-checkout__payment-option ${!billingSame ? "rl-checkout__payment-option--active" : ""}`}
            onClick={() => setBillingSame(false)}
          >
            <span className={`rl-checkout__radio ${!billingSame ? "rl-checkout__radio--checked" : ""}`} />
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
        {items.map((item, i) => (
          <div className="rl-checkout__summary-item" key={item.id}>
            <div className="rl-checkout__summary-thumb" style={{ backgroundImage: `url(${item.image})` }}>
              <span className="rl-checkout__summary-qty-badge">{i + 1}</span>
            </div>
            <div className="rl-checkout__summary-info">
              <h4>{item.title}</h4>
              <p>Size: {item.size}</p>
            </div>
            <div className="rl-checkout__summary-price">
              {item.originalPrice && (
                <span className="rl-checkout__summary-price-original">₹{item.originalPrice.toFixed(2)}</span>
              )}
              <span className={item.originalPrice ? "rl-checkout__summary-price-sale" : ""}>
                ₹{(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          </div>
        ))}

        <div className="rl-checkout__discount-row">
          <input
            className="rl-checkout__input"
            placeholder="Enter discount code here"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
          />
          <button type="button" className="rl-checkout__apply-btn" onClick={handleApplyDiscount}>
            Apply
          </button>
        </div>

        <div className="rl-checkout__totals">
          <div className="rl-checkout__totals-row">
            <span>Subtotal ({items.reduce((s, it) => s + it.quantity, 0)} items)</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="rl-checkout__totals-row">
            <span>Shipping</span>
            <span className="rl-checkout__free">FREE</span>
          </div>
          <div className="rl-checkout__totals-row">
            <span>Discount</span>
            <span className="rl-checkout__discount-value">-₹{appliedDiscount.toFixed(2)}</span>
          </div>
          <p className="rl-checkout__discount-breakdown">
            Discount on items: -₹{itemDiscount.toFixed(2)} &nbsp; Discount code: -₹{(appliedDiscount).toFixed(2)}
          </p>
        </div>

        <div className="rl-checkout__grand-total">
          <span>Total</span>
          <span>₹{grandTotal.toFixed(2)}</span>
        </div>
        <p className="rl-checkout__tax-note">Including ₹{taxAmount.toFixed(2)} in taxes</p>
      </aside>
    </div>
  );
}