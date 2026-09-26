import React, { useEffect } from "react";
import "./ProductGrid.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../Redux/features/products/productSlice";
import { addToCart, updateCartQuantity } from "../../Redux/features/cart/cartSlice";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../../Redux/features/wishlist/wishlistSlice";
import { FaMinus, FaPlus } from "react-icons/fa";

function StarIcon({ filled }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 20 20"
      fill={filled ? "currentColor" : "none"}
    >
      <path
        d="M10 1.5l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L1.3 7.8l6.1-.7L10 1.5Z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
      <path
        d="M1 10s3.2-6 9-6 9 6 9 6-3.2 6-9 6-9-6-9-6Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="10" r="2.6" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
      <path
        d="M10 17.2s-7.2-4.3-7.2-9.6a4.1 4.1 0 0 1 7.2-2.7 4.1 4.1 0 0 1 7.2 2.7c0 5.3-7.2 9.6-7.2 9.6Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
      <path
        d="M2 3h2l1.6 9.6a1.6 1.6 0 0 0 1.6 1.4h6.9a1.6 1.6 0 0 0 1.6-1.3L17 6.5H5.2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="17.2" r="1.1" fill="currentColor" />
      <circle cx="14.5" cy="17.2" r="1.1" fill="currentColor" />
    </svg>
  );
}

function ArrowIcon({ direction = "right" }) {
  return (
    <svg width="26" height="18" viewBox="0 0 26 18" fill="none" style={{ transform: direction === "left" ? "scaleX(-1)" : undefined }}>
      <path
        d="M1 9H25M25 9L18 2M25 9L18 16"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function SparkleIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
      <path
        d="M8 0c.4 3.1 1 4.6 2.2 5.8S13.1 7.6 16 8c-3.1.4-4.6 1-5.8 2.2S8.4 12.9 8 16c-.4-3.1-1-4.6-2.2-5.8S2.9 8.4 0 8c3.1-.4 4.6-1 5.8-2.2S7.6 2.9 8 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function ProductGrid({
  eyebrow = "Your Skin's Favorites",
  heading = "Best-Selling Rosaline Picks",
  subheading = "Discover the skincare staples our community loves the most, proven formulas, radiant results.",
  viewAllLabel = "View All Products",
  viewAllHref = "#!",
  onAddToCart,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { products: wishlistProducts } = useSelector((state) => state.wishlist);
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getWishlist());
  }, [dispatch]);

  const location = useLocation();

const isHomePage = location.pathname === "/";
const isProductPage = location.pathname === "/product";
const isProductDetailPage = location.pathname.startsWith("/productdetail/");

const featuredProducts = products.filter(
  (product) => product.isFeatured === true
);

const displayedProducts = isProductPage
  ? [...products].reverse()
  : isHomePage
    ? [...featuredProducts].reverse()
    : isProductDetailPage
      ? [...featuredProducts].reverse()
      : [];

  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        ...product,
        size: product.sizes?.[0] || "default",
        quantity: 1,
      }),
    );
  };

  const isInWishlist = (id) =>
    wishlistProducts?.some((item) => (item._id || item.id) === id);

  const handleToggleWishlist = (product) => {
    if (isInWishlist(product._id)) {
      dispatch(removeFromWishlist(product._id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  // addToCart matches an existing line by _id AND size, so lookups here
  // need to match on both too, not just the product id.
  const getCartItem = (product) => {
    const size = product.sizes?.[0] || "default";
    return cartItems?.find(
      (item) => item._id === product._id && item.size === size,
    );
  };

  const handleIncrement = (product) => {
    const size = product.sizes?.[0] || "default";
    const existing = getCartItem(product);
    if (existing) {
      dispatch(updateCartQuantity({ id: product._id, size, delta: 1 }));
    } else {
      dispatch(addToCart({ ...product, size, quantity: 1 }));
    }
  };

  const handleDecrement = (product) => {
    const size = product.sizes?.[0] || "default";
    const existing = getCartItem(product);
    if (!existing) return;
    // The reducer itself drops the line once quantity hits 0, so a plain
    // delta of -1 handles both "decrement" and "remove last one".
    dispatch(updateCartQuantity({ id: product._id, size, delta: -1 }));
  };

  return (
    <section className="rl-products">
      <div className="rl-products__intro">
        <span className="rl-about__eyebrow">{eyebrow}</span>
        <h2 className="rl-products__heading">{heading}</h2>
        <p className="rl-products__subheading">{subheading}</p>
      </div>

      <div className="rl-products__grid">
        {displayedProducts.map((p) => {
          const inWishlist = isInWishlist(p._id);
          const cartItem = getCartItem(p);

          return (
            <article className="rl-products__card" key={p._id}>
              <div className="rl-products__media">
                <div
                  className="rl-products__image"
                  style={{
                    backgroundImage: `url(${p.images?.[0] || "/images/no-image.png"})`,
                  }}
                />

                {p.badge && (
                  <span className="rl-products__badge">
                    <SparkleIcon />
                    {p.badge}
                  </span>
                )}

                <div className="rl-products__actions">
                  <button
                    type="button"
                    aria-label="Quick view"
                    className="rl-products__action-btn"
                    onClick={() => navigate(`/productdetail/${p._id}`)}
                  >
                    <EyeIcon />
                  </button>
                  <button
                    type="button"
                    aria-label={
                      inWishlist ? "Remove from wishlist" : "Add to wishlist"
                    }
                    className={`rl-products__action-btn ${inWishlist ? "rl-products__action-btn--active" : ""}`}
                    onClick={() => handleToggleWishlist(p)}
                  >
                    <HeartIcon />
                  </button>
                </div>
                <div className="rl-products__rating">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} filled={i < Math.round(p.rating)} />
                  ))}
                  <span className="rl-products__rating-count">
                    ({p.totalReviews})
                  </span>
                </div>
              </div>

              <h3 className="rl-products__title">{p.name}</h3>
              <p className="rl-products__product-subtitle">{p.ingredients}</p>
              <p className="rl-products__price">
                {p.salePrice > 0 && (
                  <span
                    style={{
                      textDecoration: "line-through",
                      color: "#999",
                      marginRight: "8px",
                    }}
                  >
                    ₹{p.price}
                  </span>
                )}
                ₹{p.salePrice > 0 ? p.salePrice : p.price}
              </p>

              {cartItem ? (
                <div className="rl-products__cart-row">
                  <div className="rl-pdp__stepper">
                    <button
                      type="button"
                      className="rl-pdp__stepper-btn"
                      onClick={() => handleDecrement(p)}
                      aria-label="Decrease quantity"
                    >
                      <FaMinus />
                    </button>
                    <span className="rl-pdp__stepper-value">{cartItem.quantity}</span>
                    <button
                      type="button"
                      className="rl-pdp__stepper-btn"
                      onClick={() => handleIncrement(p)}
                      aria-label="Increase quantity"
                    >
                      <FaPlus />
                    </button>
                  </div>
                  {/* <div className="rl-products__qty">
                    <button
                      type="button"
                      className="rl-products__qty-btn"
                      onClick={() => handleDecrement(p)}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="rl-products__qty-count">
                      {cartItem.quantity}
                    </span>
                    <button
                      type="button"
                      className="rl-products__qty-btn"
                      onClick={() => handleIncrement(p)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div> */}

                  <button
                    type="button"
                    className="rl-products__add-btn"
                    onClick={() => navigate("/cart")}
                    style={{ width: "100%", }}
                  >
                    Go To Cart
                  </button>
                </div>
              ) : (
                <button
                  className="rl-products__add-btn"
                  onClick={() => handleAddToCart(p)}
                >
                  Add to Cart
                </button>
              )}
            </article>
          );
        })}
      </div>
      {isHomePage && (
        <div className="rl-products__intro">
          <button
            className="rl-banner__cta"
            onClick={() => navigate("/product")}
          >
            All Products <ArrowIcon />
          </button>
        </div>
      )}
    </section>
  );
}