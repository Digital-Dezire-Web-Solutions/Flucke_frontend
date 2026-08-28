import React, { useState } from "react";
import "./Navbar.css";
import logo from "../../Assets/Logo/logo.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import TopBar from "./TopBar";
import Cart from "../Cart/Cart";
import AuthModal from "../AuthModal/AuthModal";
import Wishlist from "../Wishlist/Wishlist";
import { useDispatch, useSelector } from "react-redux";
import {
    login,
    register,
    logout,
} from "../../Redux/features/auth/authSlice";

const NAV_ITEMS = [
    { label: "HOME", path: "/", children: ["Home 01", "Home 02", "Home 03"] },
    { label: "PRODUCT", path: "/product", children: ["Product Grid", "Product Details"] },
    { label: "ABOUT", path: "/about", children: ["All Products", "Best Sellers", "New Arrivals"] },
    { label: "CONTACT", path: "/contact", children: ["Product Grid", "Product Details"] },
    //   { label: "BLOG", path: "/blog", children: ["Blog Grid", "Blog Details"] },
];

function UserIcon() {
    return (
        <svg width="19" height="19" viewBox="0 0 19 19" fill="none">
            <circle cx="9.5" cy="6" r="3.3" stroke="currentColor" strokeWidth="1.5" />
            <path d="M3 17c1.2-3.6 4-5.3 6.5-5.3S15.3 13.4 16.5 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

function HeartIcon() {
    return (
        <svg width="19" height="19" viewBox="0 0 19 19" fill="none">
            <path
                d="M9.5 16.3s-6.8-4.1-6.8-9.1a3.9 3.9 0 0 1 6.8-2.6 3.9 3.9 0 0 1 6.8 2.6c0 5-6.8 9.1-6.8 9.1Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function CartIcon() {
    return (
        <svg width="20" height="19" viewBox="0 0 20 19" fill="none">
            <path
                d="M1.5 1.5h2l1.8 11.4a1.8 1.8 0 0 0 1.8 1.5h8.2a1.8 1.8 0 0 0 1.78-1.5l1.2-7H4.9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <circle cx="8" cy="17.3" r="1.2" fill="currentColor" />
            <circle cx="14.5" cy="17.3" r="1.2" fill="currentColor" />
        </svg>
    );
}

function NavTab({ item, isOpen, onEnter, onLeave }) {
    const location = useLocation();
    const isActive = location.pathname === item.path;

    return (
        <li className="rl-navbar__item" >
            <Link
                to={item.path}
                className={`rl-navbar__link ${isActive ? "rl-navbar__link--active" : ""}`}
            >
                {item.label}
            </Link>

        </li>
    );
}

export default function Navbar() {
    const dispatch = useDispatch();
    const { user, token } = useSelector(state => state.auth);
    const cartItems = useSelector((state) => state.cart.cartItems);
    const [openMenu, setOpenMenu] = useState(null);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isWishOpen, setIsWishOpen] = useState(false);
    const [isAuthOpen, setIsAuthOpen] = useState(false);

    const navigate = useNavigate();

    const handleAccountClick = () => {
        if (!token) {
            setIsAuthOpen(true);
            return;
        }

        if (user?.role === "admin") {
            navigate("/admin");
        } else {
            navigate("/account");
        }
    };

    const handleLogin = async (data) => {
        const result = await dispatch(login(data));

        if (login.fulfilled.match(result)) {
            setIsAuthOpen(false);

            const user = result.payload.user;

            if (user.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/account");
            }
        }
    };

    const handleSignup = async (data) => {
        const result = await dispatch(register(data));

        if (register.fulfilled.match(result)) {
            setIsAuthOpen(false);

            const user = result.payload.user;

            if (user.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/account");
            }
        }
    };


    const cartCount = cartItems?.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    return (
        <header className="rl-navbar">
            <TopBar />
            <div className="rl-navbar__inner_box">
                <nav className="rl-navbar__inner">
                    <ul className="rl-navbar__links rl-navbar__links--left">
                        {NAV_ITEMS.slice(0, 4).map((item) => (
                            <NavTab
                                key={item.label}
                                item={item}
                                isOpen={openMenu === item.label}
                                onEnter={() => setOpenMenu(item.label)}
                                onLeave={() => setOpenMenu(null)}
                            />
                        ))}
                    </ul>

                    <Link to="/" className="rl-navbar__logo">
                        <img className="rl-navbar__logo-img" src={logo} alt="" />
                    </Link>

                    <div className="rl-navbar__right-group">
                        <ul className="rl-navbar__links rl-navbar__links--right">
                            {NAV_ITEMS.slice(4).map((item) => (
                                <li
                                    key={item.label}
                                    className="rl-navbar__item"
                                    onMouseEnter={() => setOpenMenu(item.label)}
                                    onMouseLeave={() => setOpenMenu(null)}
                                >
                                    <button className="rl-navbar__link" type="button">
                                        {item.label}
                                    </button>
                                    {openMenu === item.label && (
                                        <ul className="rl-navbar__dropdown">
                                            {item.children.map((child) => (
                                                <li key={child}>
                                                    <Link to={"/"}>{child}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>

                        <div className="rl-navbar__icons">

                            <button
                                type="button"
                                aria-label="Account"
                                className="rl-navbar__icon-btn"
                                onClick={handleAccountClick}
                            >
                                <UserIcon />
                            </button>
                            <button type="button" aria-label="Wishlist" className="rl-navbar__icon-btn" onClick={() => setIsWishOpen(true)}>
                                <HeartIcon />
                            </button>
                            <button type="button" aria-label="Cart" className="rl-navbar__icon-btn rl-navbar__icon-btn--cart " onClick={() => setIsCartOpen(true)}>
                                <CartIcon />
                                {cartCount > 0 &&
                                    <span className="rl-navbar__cart-badge">
                                        {cartCount}
                                    </span>}
                            </button>
                        </div>
                    </div>

                    <button className="rl-navbar__burger" aria-label="Open menu" type="button">
                        <span />
                        <span />
                        <span />
                    </button>
                </nav>
            </div>
            <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
            <Wishlist isOpen={isWishOpen} onClose={() => setIsWishOpen(false)} />
            <AuthModal
                isOpen={isAuthOpen}
                onClose={() => setIsAuthOpen(false)}
                onLogin={handleLogin}
                onSignup={handleSignup}
            />
        </header>
    );
}