import React, { useEffect, useState } from "react";
import {
  DashboardIcon,
  BoxIcon,
  HeartIcon,
  PinIcon,
  CardIcon,
  SlidersIcon,
  LogoutIcon,
} from "./Icons";
import DashboardTab from "./DashboardTab";
import OrdersTab from "./OrdersTab";
import AddressesTab from "./AddressTab";
import SettingsTab from "./SettingsTab";
import AddressModal from "./AddressModal";
import "./Account.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getProfile,
  logout,
  updateProfile,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "../../Redux/features/auth/authSlice";
import { getMyOrders } from "../../Redux/features/order/orderSlice";
import { useNavigate } from "react-router-dom";
import LuxuryCta from "../../Components/LuxuryCta/LuxuryCta";
import OrderDetailsModal from "./OrderDetailsModal";

export default function Account({ onLogout }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);
  const { myOrders } = useSelector((state) => state.orders);

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    dispatch(getProfile());
    dispatch(getMyOrders());
  }, [dispatch, token]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [addressModal, setAddressModal] = useState({
    open: false,
    address: null,
  });
  const addresses = user?.addresses || [];
  console.log(user, "addresses");

  const TABS = [
    { key: "dashboard", label: "Dashboard", icon: DashboardIcon, count: 3 },
    {
      key: "orders",
      label: "My Orders",
      icon: BoxIcon,
      count: myOrders.length,
    },
    { key: "wishlist", label: "Wishlist", icon: HeartIcon, count: 2 },
    {
      key: "addresses",
      label: "Addresses",
      icon: PinIcon,
      count: addresses?.length,
    },
    // { key: "payment", label: "Payment Methods", icon: CardIcon, count: 5 },
    { key: "settings", label: "Account Settings", icon: SlidersIcon },
  ];

  const openAddAddress = () => setAddressModal({ open: true, address: null });
  const openEditAddress = (address) => setAddressModal({ open: true, address });
  const closeAddressModal = () =>
    setAddressModal({ open: false, address: null });
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleSaveAddress = async (values) => {
    try {
      if (addressModal.address) {
        await dispatch(
          updateAddress({
            id: addressModal.address._id,
            data: values,
          }),
        ).unwrap();
      } else {
        await dispatch(addAddress(values)).unwrap();
      }

      dispatch(getProfile());

      closeAddressModal();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteAddress = async (address) => {
    if (!window.confirm("Delete address?")) return;

    try {
      await dispatch(deleteAddress(address._id)).unwrap();

      dispatch(getProfile());
    } catch (err) {
      console.log(err);
    }
  };

  const handleSetDefault = async (address) => {
    try {
      await dispatch(setDefaultAddress(address._id)).unwrap();

      dispatch(getProfile());
    } catch (err) {
      console.log(err);
    }
  };

  const orders = myOrders.map((order) => ({
    id: order.orderNumber,
    date: new Date(order.createdAt).toLocaleDateString(),
    status: order.orderStatus.toLowerCase(),
    total: order.total,
    items: order.products.map((p) => ({
      name: p.product.name,
      qty: p.quantity,
      price: p.price,
      image: p.product.images?.[0],
      size: p.size,
    })),
    shippingAddress: order.shippingAddress,
    paymentMethod: order.paymentMethod,
    couponCode: order.couponCode,
    createdAt: order.createdAt,
  }));

  const activeUser = {
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    avatarUrl: user?.avatar,
    memberSince: new Date(user?.createdAt).toLocaleDateString(),
    addresses: user?.addresses || [],
    orders: orders || [],
  };
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  if (!user) return <h2>Loading...</h2>;

  return (
    <main className="rl-account">
      <section className="rl-account__hero">
        {user.avatarUrl ? (
          <img className="rl-account__avatar" src={user.avatarUrl} alt="" />
        ) : (
          <div
            className="rl-account__avatar"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Anton', serif",
              fontSize: 32,
              color: "#3d382f",
            }}
          >
            {(user?.name || "")
              .trim()
              .split(" ")
              .filter(Boolean)
              .map((word) => word[0].toUpperCase())
              .join("")}
          </div>
        )}
        <div>
          <h1 className="rl-account__hero-name">Hello, {user.name}!</h1>
          <p className="rl-account__hero-meta">
            {user.email} · Member since{" "}
            {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>
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
          {activeTab === "dashboard" && (
            <DashboardTab
              user={activeUser}
              onGoToTab={setActiveTab}
              onEditPersonalInfo={() => setActiveTab("settings")}
              onEditAddress={openEditAddress}
            />
          )}

          {activeTab === "orders" && (
            <OrdersTab
              user={{
                ...activeUser,
                orders,
              }}
              onViewDetails={(order) => setSelectedOrder(order)}
            />
          )}

          {activeTab === "wishlist" && (
            <div className="rl-card">
              <h2 className="rl-card__title">Wishlist</h2>
              <p className="rl-card__sub">
                Your saved items will show up here.
              </p>
            </div>
          )}

          {activeTab === "addresses" && (
            <AddressesTab
              addresses={addresses}
              onAdd={openAddAddress}
              onEdit={openEditAddress}
              onDelete={handleDeleteAddress}
              onSetDefault={handleSetDefault}
            />
          )}

          {activeTab === "payment" && (
            <div className="rl-card">
              <h2 className="rl-card__title">Payment Methods</h2>
              <p className="rl-card__sub">
                Your saved cards will show up here.
              </p>
            </div>
          )}

          {activeTab === "settings" && (
            <SettingsTab
              user={activeUser}
              onSaveProfile={(values) => {
                dispatch(updateProfile(values));
              }}
            />
          )}
        </div>
      </div>

      <AddressModal
        isOpen={addressModal.open}
        address={addressModal.address}
        onClose={closeAddressModal}
        onSave={handleSaveAddress}
      />
      <OrderDetailsModal
        isOpen={!!selectedOrder}
        order={selectedOrder}
        user={activeUser}
        onClose={() => setSelectedOrder(null)}
      />
      <LuxuryCta />
    </main>
  );
}
