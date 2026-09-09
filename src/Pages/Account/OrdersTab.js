import React, { useState } from "react";
import { DownloadIcon, ViewIcon } from "./Icons";
import "./Account.css";
import { jsPDF } from "jspdf";

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

function downloadInvoice(order, user) {
  const doc = new jsPDF();
  let y = 20;
  // Header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("FLUCKE", 20, y);
  y += 8;
  doc.setFontSize(14);
  doc.text("INVOICE", 20, y);
  y += 12;
  doc.setDrawColor(180);
  doc.line(20, y, 190, y);
  y += 10;
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text(`Order ID : ${order.id}`, 20, y);
  y += 8;
  doc.text(`Date : ${order.date}`, 20, y);
  y += 8;
  doc.text(`Status : ${order.status}`, 20, y);
  y += 15;
  doc.setFont("helvetica", "bold");
  doc.text("Customer Details", 20, y);
  y += 8;
  doc.setFont("helvetica", "normal");
  doc.text(`Name : ${user.name}`, 20, y);
  y += 7;
  doc.text(`Email : ${user.email}`, 20, y);
  y += 12;
  doc.setFont("helvetica", "bold");
  doc.text("Products", 20, y);
  y += 8;
  doc.setFont("helvetica", "normal");
  order.items.forEach((item, index) => {
    doc.text(`${index + 1}. ${item.name}`, 20, y);
    y += 6;
    doc.text(`Qty : ${item.qty}`, 30, y);
    doc.text(`Price : RS ${item.price.toFixed(2)}`, 90, y);
    y += 10;
    // Add new page if needed
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
  });
  doc.line(20, y, 190, y);
  y += 10;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text(`Total : RS ${order.total.toFixed(2)}`, 20, y);
  y += 20;
  doc.setFontSize(10);
  doc.setFont("helvetica", "italic");
  doc.text("Thank you for shopping with Flucke.", 20, y);
  doc.save(`Invoice-${order.id}.pdf`);
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
                {order?.orderNote && (
                  <p className="rl-order-card__date">{order?.orderNote}</p>
                )}
              </div>
            </div>
            <div className="rl-order-card__head-right">
              <StatusBadge
                status={
                  order.status === "pending" ? "Order Placed" : order.status
                }
              />
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
