import React from "react";
import "./Account.css";

export default function OrderDetailsModal({ isOpen, order, user, onClose }) {
  if (!isOpen || !order) return null;
  console.log(order, "order");
  return (
    <div className="rl-modal-overlay" onClick={onClose}>
      <div className="rl-order-modal" onClick={(e) => e.stopPropagation()}>
        <button className="rl-modal-close" onClick={onClose}>
          ×
        </button>

        <h2>Order Details</h2>

        <div className="rl-order-modal__section">
          <h4>Order Information</h4>

          <p>
            <strong>Order ID:</strong> {order.id}
          </p>
          <p>
            <strong>Date:</strong> {order.date}
          </p>
          <p>
            <strong>Status:</strong> {order.status}
          </p>
          <p>
            <strong>Total:</strong> ₹{order.total.toFixed(2)}
          </p>
          <p>{order?.orderNote}</p>
        </div>

        <div className="rl-order-modal__section">
          <h4>Customer</h4>

          <p>{user.name}</p>
          <p>{user.email}</p>
          <p>{user.phone}</p>
        </div>

        {order.shippingAddress && (
          <div className="rl-order-modal__section">
            <h4>Shipping Address</h4>

            <p>{order.shippingAddress.fullName}</p>
            <p>{order.shippingAddress.phone}</p>
            <p>{order.shippingAddress.house}</p>
            <p>{order.shippingAddress.area}</p>
            <p>
              {order.shippingAddress.city}, {order.shippingAddress.state}
            </p>
            <p>
              {order.shippingAddress.country} - {order.shippingAddress.pincode}
            </p>
          </div>
        )}

        <div className="rl-order-modal__section">
          <h4>Products</h4>

          {order.items.map((item, index) => (
            <div className="rl-order-modal__item" key={index}>
              <img src={item.image} alt={item.name} />

              <div>
                <h5>{item.name}</h5>

                <p>Qty : {item.qty}</p>

                <p>Price : ₹{item.price.toFixed(2)}</p>

                {item.size && <p>Size : {item.size}</p>}
              </div>
            </div>
          ))}
        </div>

        <button className="rl-btn rl-btn--dark" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
