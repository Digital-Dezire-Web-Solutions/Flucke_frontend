import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductData from "../../Data/ProductData";

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

function MinusIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path
        d="M1 6H11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path
        d="M6 1V11M1 6H11"
        stroke="currentColor"
        strokeWidth="1.5"
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

function NoteIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect
        x="2.5"
        y="1.5"
        width="11"
        height="13"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path
        d="M5 5.5H11M5 8.5H11M5 11.5H8.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M8 4.5V8L10.5 9.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DiscountIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M2 7L7 2H13.5V8.5L8.5 13.5C8 14 7.2 14 6.7 13.5L2 8.8C1.5 8.3 1.5 7.5 2 7Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <circle cx="9.7" cy="5.3" r="1" fill="currentColor" />
    </svg>
  );
}

export default function Wishlist({
  isOpen = false,
  onClose,
  items,
}) {
  const navigate = useNavigate();
  const [internalItems, setInternalItems] = useState(items || ProductData);
  useEffect(() => {
    if (items) setInternalItems(items);
  }, [items]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const removeItem = (id) => {
    setInternalItems((list) => list.filter((it) => it.id !== id));
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
          <h2 className="rl-cart__title">
            Your Wishlist ({internalItems.length})
          </h2>
          <button
            type="button"
            className="rl-cart__close"
            onClick={onClose}
            aria-label="Close cart"
          >
            <CloseIcon />
          </button>
        </div>

        {/* <div className="rl-cart__shipping">
          {remainingForFreeShipping > 0 ? (
            <p className="rl-cart__shipping-text">
              Spend ₹{remainingForFreeShipping.toFixed(2)} more for free
              shipping
            </p>
          ) : (
            <p className="rl-cart__shipping-text">
              You've unlocked free shipping!
            </p>
          )}
          <div className="rl-cart__progress">
            <div
              className="rl-cart__progress-fill"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div> */}

        <div className="rl-cart__items">
          {internalItems.map((item) => (
            <div className="rl-cart__item" key={item.id}>
              <div
                className="rl-cart__item-thumb"
                style={{ backgroundImage: `url(${item.image})` }}
              />

              <div className="rl-cart__item-body">
                <div className="rl-cart__item-top">
                  <div>
                    <h3 className="rl-cart__item-title">{item.title}</h3>
                    <p className="rl-cart__item-size">Size: {item.size}</p>
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
                  <div className="rl-cart__item-price">
                    <div className="rl-cart__item-bottom">
                      <button
                        type="button"
                        className="rl-cart__remove"
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remove ${item.title}`}
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {internalItems.length === 0 && (
            <p className="rl-cart__empty">Your cart is empty.</p>
          )}
        </div>
      </aside>
    </>
  );
}
