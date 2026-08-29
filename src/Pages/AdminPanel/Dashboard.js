import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getOrders } from "../../Redux/features/order/orderSlice";
import { getCoupons } from "../../Redux/features/coupon/couponslice";
import { getUsers } from "../../Redux/features/auth/authSlice";

import "./Dashboard.css";
import { getProducts } from "../../Redux/features/products/productSlice";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { orders } = useSelector((state) => state.orders);
  const { products } = useSelector((state) => state.products);
  const { coupons } = useSelector((state) => state.coupons);
  const { users } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getOrders());
    dispatch(getProducts());
    dispatch(getCoupons());
    dispatch(getUsers());
  }, [dispatch]);

  const revenue = useMemo(() => {
    return orders
      .filter((o) => o.orderStatus === "Delivered")
      .reduce((sum, order) => sum + order.total, 0);
  }, [orders]);

  const pendingOrders = orders.filter(
    (o) => o.orderStatus === "Pending"
  ).length;

  const deliveredOrders = orders.filter(
    (o) => o.orderStatus === "Delivered"
  ).length;

  const recentOrders = [...orders]
    .sort(
      (a, b) =>
        new Date(b.createdAt) - new Date(a.createdAt)
    )
    .slice(0, 5);

  const cards = [
    {
      title: "Orders",
      value: orders.length,
    },
    {
      title: "Products",
      value: products.length,
    },
    {
      title: "Users",
      value: users?.length || 0,
    },
    {
      title: "Coupons",
      value: coupons.length,
    },
    {
      title: "Revenue",
      value: `₹${revenue.toLocaleString()}`,
    },
    {
      title: "Pending",
      value: pendingOrders,
    },
    {
      title: "Delivered",
      value: deliveredOrders,
    },
  ];

  return (
    <div className="dashboard">

      <div className="dashboard-cards">

        {cards.map((card) => (
          <div className="dashboard-card" key={card.title}>
            <h4>{card.title}</h4>
            <h2>{card.value}</h2>
          </div>
        ))}

      </div>

      <div className="dashboard-table">

        <div className="dashboard-table-header">
          <h2>Recent Orders</h2>
        </div>

        <table>

          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>

            {recentOrders.map((order) => (

              <tr key={order._id}>

                <td>{order.orderNumber}</td>

                <td>
                  {order.user?.name ||
                    `${order.user?.email || ""
                    }`}
                </td>

                <td>₹{order.total}</td>

                <td>

                  <span
                    className={`dashboard-status status-${order.orderStatus.toLowerCase()}`}
                  >
                    {order.orderStatus}
                  </span>

                </td>

                <td>
                  {new Date(
                    order.createdAt
                  ).toLocaleDateString()}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Dashboard;