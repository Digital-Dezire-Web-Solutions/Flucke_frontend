import React, { useState } from "react";
import { DownloadIcon, ViewIcon } from "./Icons";
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
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

/**
 * Builds a plain-text invoice and triggers a browser download.
 * Swap this for a call to your backend's PDF endpoint when you have one —
 * everything else (the button, the click handler shape) stays the same.
 */
function downloadInvoice(order, user) {
  const lines = [
    "ROSALINE — INVOICE",
    "----------------------------------------",
    `Order: ${order.id}`,
    `Date: ${order.date}`,
    `Status: ${order.status}`,
    "",
    `Billed to: ${user.name}`,
    `Email: ${user.email}`,
    "",
    "Items:",
    ...order.items.map(
      (item) => `  ${item.name}  x${item.qty}  —  $${item.price.toFixed(2)}`,
    ),
    "----------------------------------------",
    `Total: ₹${order.total.toFixed(2)}`,
  ];

  const blob = new Blob([lines.join("\n")], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `invoice-${order.id}.txt`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export default function OrdersTab({ user, onViewDetails }) {

  return (
    <div className="rl-orders-grid">
      {user.orders.map((order) => (
        <div className="rl-order-card" key={order.id}>
          <div className="rl-order-card__head">
            <div className="rl-order-card__head-left">
              <div>
                <p className="rl-order-card__id">{order.id}</p>
                <p className="rl-order-card__date">{order.date}</p>
              </div>
            </div>
            <div className="rl-order-card__head-right">
              <StatusBadge status={order.status} />
              <span className="rl-order-card__total">
                ₹{order.total.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="rl-order-card__items">
            {order.items.map((item) => (
              <div className="rl-order-item" key={item.name}>
                <img className="rl-order-item__thumb" src={item.image} alt="" />
                <div className="rl-order-item__info">
                  <p className="rl-order-item__name">{item.name}</p>
                  <p className="rl-order-item__qty">Qty: {item.qty}</p>
                </div>
                <span className="rl-order-item__price">
                  ₹{item.price.toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="rl-order-card__footer">
            <button
              className="rl-btn rl-btn--dark rl-btn--block"
              onClick={() => onViewDetails?.(order)}
            >
              <ViewIcon /> View Details
            </button>
            <button
              className="rl-btn rl-btn--ghost rl-btn--block"
              onClick={() => downloadInvoice(order, user)}
            >
              <DownloadIcon /> Invoice
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
