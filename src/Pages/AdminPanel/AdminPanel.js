import React, { useEffect, useState } from "react";
import {
  DashboardIcon,
  BoxIcon,
  HeartIcon,
  PinIcon,
  CardIcon,
  SlidersIcon,
  LogoutIcon,
} from "../Account/Icons";
import "./AdminPanel.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getProfile,
  logout,
  updateProfile,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
  getUsers,
} from "../../Redux/features/auth/authSlice";
import { getMyOrders, getOrders } from "../../Redux/features/order/orderSlice";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Orders from "./Orders";
import Products from "./Products";
import Coupons from "./Coupons";
import Users from "./Users";
import { getCoupons } from "../../Redux/features/coupon/couponslice";

export default function AdminPanel({ onLogout }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, users = [], token } = useSelector((state) => state.auth);
  const { orders } = useSelector((state) => state.orders);
  const { coupons } = useSelector((state) => state.coupons);

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    dispatch(getProfile());
    dispatch(getUsers());
    dispatch(getOrders());
    dispatch(getCoupons());
  }, [dispatch, token]);
  const [activeTab, setActiveTab] = useState("dashboard");

  const TABS = [
    { key: "dashboard", label: "Dashboard", icon: DashboardIcon },
    {
      key: "orders",
      label: "Orders",
      icon: BoxIcon,
      count: orders?.length,
    },
    { key: "products", label: "Products", icon: HeartIcon, count: 2 },
    {
      key: "coupons",
      label: "Coupon",
      icon: PinIcon,
        count: coupons?.length,
    },
    // { key: "payment", label: "Payment Methods", icon: CardIcon, count: 5 },
    { key: "users", label: "Users", icon: SlidersIcon, count: users?.length },
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  if (!user) return <h2>Loading...</h2>;

  return (
    <main className="rl-account adminPanel">
      <section className="rl-account__hero">
        <div>
          <h1 className="rl-account__hero-name">Hello, {user.name}!</h1>
        </div>
        <img className="rl-account__avatar" src={user.avatarUrl || ""} alt="" />
      </section>

      <div className="rl-account__body">
        <nav className="rl-account__nav">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                className={`rl-account__nav-item ${active ? "rl-account__nav-item--active" : ""}`}
                onClick={() => setActiveTab(tab.key)}
              >
                <Icon />
                <span className="rl-account__nav-label">{tab.label}</span>
                {tab.count != null && (
                  <span className="rl-account__nav-count">{tab.count}</span>
                )}
              </button>
            );
          })}
          <button
            type="button"
            className="rl-account__nav-item rl-account__nav-item--logout"
            onClick={handleLogout}
          >
            <LogoutIcon />
            <span className="rl-account__nav-label">Log Out</span>
          </button>
        </nav>

        <div className="rl-account__content">
          {activeTab === "dashboard" && <Dashboard />}

          {activeTab === "orders" && <Orders />}

          {activeTab === "products" && <Products />}

          {activeTab === "coupons" && <Coupons />}

          {activeTab === "users" && <Users />}
        </div>
      </div>
    </main>
  );
}
