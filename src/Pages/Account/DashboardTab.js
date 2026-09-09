import React from "react";
import { PinIcon } from "./Icons";
import "./Account.css";

function StatusBadge({ status }) {
  const map = {
    shipping: "rl-badge--shipping",
    delivered: "rl-badge--delivered",
    cancelled: "rl-badge--cancelled",
    processing: "rl-badge--processing",
  };
  return (
    <span className={`rl-badge ${map[status] || "rl-badge--processing"}`}>
      {status?.charAt(0).toUpperCase() + status?.slice(1)}
    </span>
  );
}

export default function DashboardTab({
  user,
  onEditPersonalInfo,
  onViewAllOrders,
  onEditAddress,
  onGoToTab,
}) {
  const defaultAddress =
    user.addresses.find((a) => a.isDefault) || user.addresses[0];
  console.log(user, "users");

  return (
    <>
      <div className="rl-card">
        <div className="rl-card__head">
          <h2 className="rl-card__title">Personal Information</h2>
          <button className="rl-link-btn" onClick={onEditPersonalInfo}>
            Edit
          </button>
        </div>
        <dl className="rl-info-grid">
          <div>
            <dt>Full Name</dt>
            <dd>{user.name}</dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>{user.email}</dd>
          </div>
          <div>
            <dt>Phone Number</dt>
            <dd>{user.phone}</dd>
          </div>
          <div>
            <dt>Date of Birth</dt>
            <dd>{user.dob}</dd>
          </div>
        </dl>
      </div>

      <div className="rl-card">
        <div className="rl-card__head">
          <h2 className="rl-card__title">Recent Orders</h2>
          <button className="rl-link-btn" onClick={() => onGoToTab?.("orders")}>
            View All
          </button>
        </div>
        {user.orders.slice(0, 3).map((order) => (
          <div className="rl-order-row" key={order._id}>
            <div>
              <p className="rl-order-row__id">{order.id}</p>
              <p className="rl-order-row__date">{order.date}</p>
            </div>
            <div className="rl-order-row__right">
              <StatusBadge
                status={
                  order.status === "pending" ? "Order Placed" : order.status
                }
              />
              <span className="rl-order-row__total">
                ₹{order.total.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {defaultAddress && (
        <div className="rl-card">
          <div className="rl-card__head">
            <h2 className="rl-card__title">Default Address</h2>
            <button
              className="rl-link-btn"
              onClick={() => onEditAddress?.(defaultAddress)}
            >
              Edit
            </button>
          </div>
          <div className="rl-address-block">
            <PinIcon />
            <div>
              <strong>{defaultAddress.name}</strong>
              <p>
                {defaultAddress.phone}
                <br />
                {defaultAddress.area}, {defaultAddress.city},{" "}
                {defaultAddress.state} {defaultAddress.pincode}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
