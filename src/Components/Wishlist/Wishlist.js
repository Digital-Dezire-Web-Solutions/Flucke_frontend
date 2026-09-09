import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getWishlist,
  removeFromWishlist,
} from "../../Redux/features/wishlist/wishlistSlice";
import { useNavigate } from "react-router-dom";

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path
        d="M4.5 4.5L17.5 17.5M17.5 4.5L4.5 17.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
      <path
        d="M2.5 4.5H14.5M6.5 4.5V2.8C6.5 2.3 6.9 2 7.3 2H9.7C10.1 2 10.5 2.3 10.5 2.8V4.5M12.8 4.5L12.3 13.5C12.3 14 11.9 14.4 11.4 14.4H5.6C5.1 14.4 4.7 14 4.7 13.5L4.2 4.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Your Product model's exact field names weren't shared, so this
// normalizes a few likely shapes (name/title, image/images[0], price as
// number or string) into what the drawer renders. Adjust the fallbacks
// below once you confirm the real schema.
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

export default function Wishlist({ isOpen = false, onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, error } = useSelector((state) => state.wishlist);

  // Refresh from the server every time the drawer opens, rather than
  // once on mount, so it reflects anything added elsewhere (a heart
  // button on a product card, another tab, etc.) since it was last open.
  useEffect(() => {
    if (isOpen) dispatch(getWishlist());
  }, [isOpen, dispatch]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const items = products?.map(normalizeProduct);

  const handleRemove = (id) => {
    dispatch(removeFromWishlist(id));
  };

  const handleViewProduct = (id) => {
    onClose && onClose();
    navigate(`/productdetail/${id}`);
  };

  return (
    <>
      <div
        className={`rl-cart__overlay ${isOpen ? "rl-cart__overlay--open" : ""}`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />

      <aside
        className={`rl-cart ${isOpen ? "rl-cart--open" : ""}`}
        aria-hidden={!isOpen}
      >
        <div className="rl-cart__header">
          <h2 className="rl-cart__title">Your Wishlist ({items.length})</h2>
          <button
            type="button"
            className="rl-cart__close"
            onClick={onClose}
            aria-label="Close wishlist"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="rl-cart__items">
          {loading && <p className="rl-cart__empty">Loading your wishlist…</p>}

          {!loading && error && <p className="rl-cart__empty">{error}</p>}

          {!loading &&
            !error &&
            items.map((item) => (
              <div className="rl-cart__item" key={item.id}>
                <div
                  className="rl-cart__item-thumb"
                  style={{
                    backgroundImage: item.image
                      ? `url(${item.image})`
                      : undefined,
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

          {!loading && !error && items.length === 0 && (
            <p className="rl-cart__empty">Your wishlist is empty.</p>
          )}
        </div>
      </aside>
    </>
  );
}
