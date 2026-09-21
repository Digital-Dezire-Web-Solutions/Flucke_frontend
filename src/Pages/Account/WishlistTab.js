import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFromWishlist } from "../../Redux/features/wishlist/wishlistSlice";
import { TrashIcon } from "./Icons";

function HeartOffIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
      <path
        d="M2.5 4.5H14.5M6.5 4.5V2.8C6.5 2.3 6.9 2 7.3 2H9.7C10.1 2 10.5 2.3 10.5 2.8V4.5M12.8 4.5L12.3 13.5C12.3 14 11.9 14.4 11.4 14.4H5.6C5.1 14 4.7 14 4.7 13.5L4.2 4.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Same normalization used in the Wishlist drawer, kept here too since
// this tab can be rendered independently of that component. Adjust the
// fallbacks if your Product schema's real field names differ.
function normalizeProduct(p) {
  return {
    id: p._id || p.id,
    title: p.name || p.title || "Untitled product",
    image: p.image || (Array.isArray(p.images) ? p.images[0] : undefined),
    size: p.size || p.defaultSize || p.variant || "",
    price: Number(p.price) || 0,
    originalPrice: p.originalPrice ? Number(p.originalPrice) : undefined,
  };
}

export default function WishlistTab({ products = [], loading, error }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const items = (products || []).map(normalizeProduct);

  const handleRemove = (id) => {
    dispatch(removeFromWishlist(id));
  };

  const handleView = (id) => {
    navigate(`/productdetail/${id}`);
  };

  if (loading) {
    return (
      <div className="rl-card">
        <h2 className="rl-card__title">Wishlist</h2>
        <p className="rl-card__sub">Loading your wishlist…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rl-card">
        <h2 className="rl-card__title">Wishlist</h2>
        <p className="rl-card__sub">{error}</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="rl-card">
        <h2 className="rl-card__title">Wishlist</h2>
        <p className="rl-card__sub">Your saved items will show up here.</p>
      </div>
    );
  }

  const handleViewProduct = (id) => {
    // onClose && onClose();
    navigate(`/productdetail/${id}`);
  };

  return (
    <div className="rl-card">
      <h2 className="rl-card__title">Wishlist ({items.length})</h2>

      <div className="rl-wishlist-grid">
        {items.map((item) => (
          <div className="rl-cart__item" key={item.id}>
            <div
              className="rl-cart__item-thumb"
              style={{
                backgroundImage: item.image ? `url(${item.image})` : undefined,
              }}
              onClick={handleViewProduct}
            />

            <div className="rl-cart__item-body">
              <div className="rl-cart__item-top">
                <div>
                  <h3 className="rl-cart__item-title">{item.title}</h3>
                  {item.size && (
                    <p className="rl-cart__item-size">Size: {item.size}</p>
                  )}
                  <div className="rl-cart__item-price">
                    {item.originalPrice && (
                      <span className="rl-cart__item-price-original">
                        ₹{item.originalPrice.toFixed(2)}
                      </span>
                    )}
                    <span
                      className={
                        item.originalPrice ? "rl-cart__item-price-sale" : ""
                      }
                    >
                      ₹{item.price.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="rl-cart__item-bottom">
                  <button
                    type="button"
                    className="rl-cart__remove"
                    onClick={() => handleRemove(item.id)}
                    aria-label={`Remove ${item.title}`}
                  >
                    <TrashIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
