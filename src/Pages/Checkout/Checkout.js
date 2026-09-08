import React, { useEffect, useState } from "react";
import "./Checkout.css";
import ProductData from "../../Data/ProductData";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../Redux/features/order/orderSlice";
import { clearCart } from "../../Redux/features/cart/cartSlice";
import { clearCoupon } from "../../Redux/features/coupon/couponslice";
import { useNavigate } from "react-router-dom";
import LuxuryCta from "../../Components/LuxuryCta/LuxuryCta";
import AddressesTab from "../Account/AddressTab";
import AddressModal from "../Account/AddressModal";
import { addAddress, getProfile } from "../../Redux/features/auth/authSlice";
import LoadingModal from "../../Components/Loaders/LoadingModal";
import axios from "axios";
import api from "../../Redux/services/api";

const FOOTER_LINKS = [
  "Refund policy",
  "Shipping",
  "Privacy policy",
  "Terms of service",
  "Legal notice",
  "Contact",
];

export default function Checkout({ taxAmount = 0, onPlaceOrder }) {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { appliedCoupon } = useSelector((state) => state.coupons);
  const defaultAddress =
    user?.addresses?.find((a) => a.isDefault) || user?.addresses?.[0];

  const [selectedAddress, setSelectedAddress] = useState(defaultAddress);
  const [loading, setLoading] = useState(false);
  const [addressModal, setAddressModal] = useState({
    open: false,
    address: null,
  });

  const openAddAddress = () =>
    setAddressModal({
      open: true,
      address: null,
    });

  const closeAddressModal = () =>
    setAddressModal({
      open: false,
      address: null,
    });

  const handleSaveAddress = async (values) => {
    try {
      await dispatch(addAddress(values)).unwrap();

      const res = await dispatch(getProfile()).unwrap();

      const address =
        res.addresses?.find((a) => a.isDefault) || res.addresses?.[0];

      setSelectedAddress(address);

      closeAddressModal();
    } catch (err) {
      console.log(err);
    }
  };

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
  useEffect(() => {
    const defaultAddress =
      user?.addresses?.find((a) => a.isDefault) || user?.addresses?.[0];

    if (defaultAddress) {
      setSelectedAddress(defaultAddress);
    } else {
      setSelectedAddress(null);
    }
  }, [user?.addresses]);

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

    if (!cartItems.length) {
      alert("Your cart is empty");
      return;
    }

    if (!selectedAddress) {
      alert("Please add and select a delivery address.");
      return;
    }
    setLoading(true);
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
      // const response = await api.post(
      //   "/orders/razorpay/create-order",
      //   {
      //     amount: grandTotal,
      //   },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${localStorage.getItem("token")}`,
      //     },
      //   },
      // );

      // const { order, key } = response.data;
      await dispatch(createOrder(orderData)).unwrap();

      dispatch(clearCart());
      dispatch(clearCoupon());

      setTimeout(() => {
        setLoading(false);
        alert("Order placed successfully.");
        navigate("/account");
      }, 3000);
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
            <h3>Shipping methods</h3>
            <div className="rl-checkout__placeholder-box">
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
                  onClick={openAddAddress}
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
                      value={address._id}
                      checked={selectedAddress?._id === address._id}
                      onChange={() => setSelectedAddress(address)}
                    />

                    <div>
                      <strong>{address.name}</strong>

                      <p>{address.area}</p>

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
                    className="rl-btn rl-btn--dark"
                    onClick={openAddAddress}
                  >
                    + Add Address
                  </button>
                </div>
              )}
            </div>
          </section>
          {/* <section className="rl-checkout__section">
            
          </section> */}

          {/* <section className="rl-checkout__section">
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
          </section> */}

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
          {/* <p className="rl-checkout__tax-note">
            Including ₹{taxAmount.toFixed(2)} in taxes
          </p> */}
        </aside>
        <AddressModal
          isOpen={addressModal.open}
          address={addressModal.address}
          onClose={closeAddressModal}
          onSave={handleSaveAddress}
        />
        {loading === true && <LoadingModal loadingtype={"truck"} />}
      </div>

      <LuxuryCta />
    </>
  );
}
