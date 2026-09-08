import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrders,
  updateOrderStatus,
} from "../../Redux/features/order/orderSlice";
import "./AdminTable.css";

const STATUS = [
  "Pending",
  "Confirmed",
  "Packed",
  "Shipped",
  "Delivered",
  "Cancelled",
];

export default function Orders() {
  const dispatch = useDispatch();

  const { orders, loading } = useSelector((state) => state.orders);

  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const customer =
        order.user?.name ||
        `${order.user?.firstName || ""} ${order.user?.lastName || ""}`;

      return (
        order.orderNumber
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        customer.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [orders, search]);

  const changeStatus = async (id, status) => {
    await dispatch(updateOrderStatus({ id, status }));
  };
  console.log(filteredOrders,"order")

  return (
    <div className="admin-table-wrapper">
      <div className="table-header">
        <h2>Orders</h2>

        <input
          placeholder="Search Order..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table className="admin-table">

        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Payment</th>
            <th>Status</th>
            <th>Date</th>
            <th width="250">Actions</th>
          </tr>
        </thead>

        <tbody>

          {filteredOrders.map((order) => (

            <tr key={order._id}>

              <td>{order.orderNumber}</td>

              <td>
                {order.user?.name ||
                  `${order.user?.email || ""}`}
              </td>

              <td>₹{order.total}</td>

              <td>{order.paymentMethod}</td>

              <td>

                <span
                  className={`status-badge status-${order.orderStatus.toLowerCase()}`}
                >
                  {order.orderStatus}
                </span>

              </td>

              <td>
                {new Date(order.createdAt).toLocaleDateString()}
              </td>

              <td>

                <select
                  value={order.orderStatus}
                  onChange={(e) =>
                    changeStatus(order._id, e.target.value)
                  }
                >
                  {STATUS.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>

                <button
                  className="edit-btn"
                  style={{ marginLeft: 10 }}
                  onClick={() => setSelectedOrder(order)}
                >
                  View
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      {loading && <p>Loading...</p>}

      {selectedOrder && (
        <div
          className="admin-modal-overlay"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="admin-modal"
            style={{ maxWidth: 700 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Order Details</h2>

            <p>
              <strong>Order :</strong>{" "}
              {selectedOrder.orderNumber}
            </p>

            {/* <p>
              <strong>Customer :</strong>{" "}
              {selectedOrder.user?.name}
            </p> */}

            <p>
              <strong>Email :</strong>{" "}
              {selectedOrder.user?.email}
            </p>

            <p>
              <strong>Payment :</strong>{" "}
              {selectedOrder.paymentMethod}
            </p>

            <p>
              <strong>Status :</strong>{" "}
              {selectedOrder.orderStatus}
            </p>

            <hr />

            <h3>Products</h3>

            <table className="admin-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Qty</th>
                  <th>Price</th>
                </tr>
              </thead>

              <tbody>

                {selectedOrder.products.map((item) => (

                  <tr key={item._id}>

                    <td>

                      <img
                        src={item.product?.images?.[0]}
                        alt=""
                        style={{
                          width: 60,
                          height: 60,
                          objectFit: "cover",
                          borderRadius: 8,
                        }}
                      />

                    </td>

                    <td>{item.product?.name}</td>

                    <td>{item.quantity}</td>

                    <td>₹{item.price}</td>

                  </tr>

                ))}

              </tbody>

            </table>

            <hr />

            <h3>Shipping Address</h3>

            <p>
              {selectedOrder.shippingAddress?.fullName}
            </p>

            <p>
              {selectedOrder.shippingAddress?.phone}
            </p>

            <p>
              {selectedOrder.shippingAddress?.house}
            </p>

            <p>
              {selectedOrder.shippingAddress?.area}
            </p>

            <p>
              {selectedOrder.shippingAddress?.city},{" "}
              {selectedOrder.shippingAddress?.state}
            </p>

            <p>
              {selectedOrder.shippingAddress?.country} -{" "}
              {selectedOrder.shippingAddress?.pincode}
            </p>

            <div className="modal-actions">

              <button
                className="save-btn"
                onClick={() => setSelectedOrder(null)}
              >
                Close
              </button>

            </div>

          </div>
        </div>
      )}
    </div>
  );
}