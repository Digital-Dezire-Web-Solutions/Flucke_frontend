import React, { useEffect } from "react";
import "./ProductGrid.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../Redux/features/products/productSlice";
import { addToCart } from "../../Redux/features/cart/cartSlice";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../../Redux/features/wishlist/wishlistSlice";

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

function SwapIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
      <path
        d="M2 7h13M15 7l-3-3M15 7l-3 3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 13H5M5 13l3-3M5 13l3 3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="12" viewBox="0 0 14 12" fill="none">
      <path
        d="M0.5 6H13M13 6L8.5 1M13 6L8.5 11"
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
  const { wishlistProducts } = useSelector(
    (state) => state.wishlist?.products || [],
  );
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getWishlist());
  }, [dispatch]);

  // const handleAddToCart = (product) => {
  //   dispatch(addToCart(product));
  // };
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

  // console.log(products, "products");
  return (
    <section className="rl-products">
      <div className="rl-products__intro">
        <span className="rl-about__eyebrow">
          {/* <span className="rl-products__eyebrow-dot" /> */}
          {eyebrow}
        </span>
        <h2 className="rl-products__heading">{heading}</h2>
        <p className="rl-products__subheading">{subheading}</p>
      </div>

      <div className="rl-products__grid">
        {products.map((p) => {
          const inWishlist = isInWishlist(p._id);
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

              <button
                className="rl-products__add-btn"
                onClick={() => handleAddToCart(p)}
              >
                Add to Cart
              </button>
            </article>
          );
        })}
      </div>

      {/* <a className="rl-products__view-all" href={viewAllHref}>
        {viewAllLabel}
        <ArrowIcon />
      </a> */}
    </section>
  );
}
