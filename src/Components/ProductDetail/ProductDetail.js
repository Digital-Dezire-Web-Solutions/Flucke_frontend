import React, { useEffect, useRef, useState } from "react";
import "./ProductDetail.css";
import product1 from "../../Assets/Products/product4.jpg";
import product2 from "../../Assets/Products/product5.jpg";
import product3 from "../../Assets/Products/product3.jpg";
import product4 from "../../Assets/Products/prodbeforeafter.avif";
import { LucideEye } from "lucide-react";

function StarIcon({ filled }) {
  return (
    <svg
      width="15"
      height="15"
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

function ChevronIcon({ direction = "left" }) {
  return (
    <svg
      width="9"
      height="14"
      viewBox="0 0 9 14"
      fill="none"
      style={{ transform: direction === "right" ? "scaleX(-1)" : undefined }}
    >
      <path
        d="M8 1L1.5 7L8 13"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path
        d="M1 6.5H12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path
        d="M6.5 1V12M1 6.5H12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 19" fill="none">
      <path
        d="M1.5 1.5h2l1.8 11.4a1.8 1.8 0 0 0 1.8 1.5h8.2a1.8 1.8 0 0 0 1.78-1.5l1.2-7H4.9"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="17.3" r="1.1" fill="currentColor" />
      <circle cx="14.5" cy="17.3" r="1.1" fill="currentColor" />
    </svg>
  );
}

// --- Product catalog -------------------------------------------------
// Each entry is a full product. The "Complete Lineup" cross-sell at the
// bottom is derived from this catalog (every product except whichever
// one is currently active), so clicking "View" on a lineup card swaps
// the whole page over to that product in place, instead of navigating
// to a different route.
const PRODUCTS = {
  "hyaluronic-serum": {
    id: "hyaluronic-serum",
    title: "HYALURONIC ACID ANTI-WRINKLE SERUM",
    subtitle: "Target dullness, refine texture, and boost radiance.",
    rating: 4.9,
    reviewCount: 1245,
    price: "₹99.00",
    originalPrice: "₹123.75",
    images: [product4, product1, product2, product3, product1, product2],
    sizes: ["30ml / 1.06 fl oz"],
    sections: [
      {
        id: "description",
        title: "Description",
        content:
          "A chill pill for stressed skin—our lipid blend repairs the barrier, calms irritation, and restores a healthy glow. A chill pill for stressed skin—our lipid blend repairs the barrier, calms irritation, and restores a healthy glow.",
      },
      {
        id: "benefits",
        title: "Benefits",
        content:
          "Reduces redness, strengthens the moisture barrier, and leaves skin visibly calmer within days of consistent use.",
      },
      {
        id: "how-to-use",
        title: "How To Use",
        content:
          "Apply 2-3 drops to clean, damp skin morning and night. Follow with moisturizer and SPF during the day.",
      },
      {
        id: "key-ingredients",
        title: "Key Ingredients",
        content:
          "Ceramides, niacinamide, and centella asiatica work together to repair, soothe, and brighten the complexion.",
      },
    ],
    lineupCard: { price: "₹22.00", originalPrice: "₹26.00" },
  },
  "retinol-serum": {
    id: "retinol-serum",
    title: "BRIGHTENING & REPAIRING RETINOL SERUM",
    subtitle: "Fade dark spots, smooth texture, and renew skin overnight.",
    rating: 4.8,
    reviewCount: 932,
    price: "₹42.00",
    originalPrice: "₹76.00",
    images: [product2, product1, product3, product4, product1],
    sizes: ["30ml / 1.06 fl oz"],
    sections: [
      {
        id: "description",
        title: "Description",
        content:
          "A transformative retinol formula that helps reduce the appearance of wrinkles, improve skin texture, and restore natural radiance while you sleep.",
      },
      {
        id: "benefits",
        title: "Benefits",
        content:
          "Softens fine lines, evens out tone, and supports collagen renewal with consistent nightly use.",
      },
      {
        id: "how-to-use",
        title: "How To Use",
        content:
          "Apply a pea-sized amount to clean, dry skin at night. Start 2-3 times per week and build up tolerance. Always follow with SPF the next morning.",
      },
      {
        id: "key-ingredients",
        title: "Key Ingredients",
        content:
          "Encapsulated retinol, niacinamide, and squalane work together to renew, brighten, and comfort the skin barrier.",
      },
    ],
    lineupCard: { price: "₹42.00", originalPrice: "₹76.00" },
  },
};

const DEFAULT_PRODUCT_ID = "hyaluronic-serum";

export default function ProductDetail({
  productId = DEFAULT_PRODUCT_ID,
  lineupHeading = "Complete Lineup",
  lineupSubheading = "Check out other essentials in the Pear Rosaline Collection and build your full daily skincare ritual with ease.",
  onAddToCart,
}) {
  const [activeId, setActiveId] = useState(productId);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [openSection, setOpenSection] = useState(null);

  const topRef = useRef(null);

  const product = PRODUCTS[activeId] || PRODUCTS[DEFAULT_PRODUCT_ID];
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);

  // Whenever the active product changes (via "View" on a lineup card),
  // reset the per-product UI state — gallery back to the first image,
  // quantity back to 1, description accordion open — so nothing carries
  // over from the previous product by accident.
  useEffect(() => {
    setActiveImage(0);
    setQuantity(1);
    setSelectedSize(product.sizes[0]);
    setOpenSection(product.sections[0]?.id ?? null);
  }, [activeId]); // eslint-disable-line react-hooks/exhaustive-deps

  const goPrev = () =>
    setActiveImage((i) => (i - 1 + product.images.length) % product.images.length);
  const goNext = () => setActiveImage((i) => (i + 1) % product.images.length);

  const handleViewProduct = (id) => {
    if (id === activeId) return;
    setActiveId(id);
    // Scroll the whole product-detail block back into view, so switching
    // products from the lineup at the bottom of the page brings the user
    // back up to see the newly-selected product.
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const lineup = Object.values(PRODUCTS)
    .filter((p) => p.id !== activeId)
    .map((p) => ({
      id: p.id,
      image: p.images[0],
      title: p.title,
      price: p.lineupCard.price,
      originalPrice: p.lineupCard.originalPrice,
    }));

  return (
    <section className="rl-pdp" ref={topRef}>
      <div className="rl-pdp__top">
        {/* Gallery */}
        <div className="rl-pdp__gallery">
          <div className="rl-pdp__thumbs">
            {product.images.map((img, i) => (
              <button
                key={img + i}
                type="button"
                className={`rl-pdp__thumb ${i === activeImage ? "rl-pdp__thumb--active" : ""}`}
                style={{ backgroundImage: `url(${img})` }}
                onClick={() => setActiveImage(i)}
                aria-label={`View image ${i + 1}`}
              />
            ))}
          </div>

          <div className="rl-pdp__main-image">
            <div
              className="rl-pdp__main-image-inner"
              style={{ backgroundImage: `url(${product.images[activeImage]})` }}
            />

            <div className="rl-pdp__nav">
              <button
                type="button"
                className="rl-pdp__nav-btn"
                onClick={goPrev}
                aria-label="Previous image"
              >
                <ChevronIcon direction="left" />
              </button>
              <button
                type="button"
                className="rl-pdp__nav-btn"
                onClick={goNext}
                aria-label="Next image"
              >
                <ChevronIcon direction="right" />
              </button>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="rl-pdp__info">
          <h1 className="rl-pdp__title">{product.title}</h1>
          <p className="rl-pdp__subtitle">{product.subtitle}</p>

          <div className="rl-pdp__rating">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon key={i} filled={i < Math.round(product.rating)} />
            ))}
            <span className="rl-pdp__rating-text">
              {product.rating}/5 ({product.reviewCount.toLocaleString()} reviews)
            </span>
          </div>

          <div className="rl-pdp__price-row">
            <span className="rl-pdp__price">{product.price}</span>
            {product.originalPrice && (
              <span className="rl-pdp__price-original">{product.originalPrice}</span>
            )}
          </div>

          <div className="rl-pdp__size">
            <span className="rl-pdp__label">Net Weight:</span>
            <div className="rl-pdp__size-options">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`rl-pdp__size-btn ${s === selectedSize ? "rl-pdp__size-btn--active" : ""}`}
                  onClick={() => setSelectedSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="rl-pdp__quantity">
            <span className="rl-pdp__label">Quantity:</span>
            <div className="rl-pdp__stepper">
              <button
                type="button"
                className="rl-pdp__stepper-btn"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                <MinusIcon />
              </button>
              <span className="rl-pdp__stepper-value">{quantity}</span>
              <button
                type="button"
                className="rl-pdp__stepper-btn"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
              >
                <PlusIcon />
              </button>
            </div>
          </div>

          <button
            type="button"
            className="rl-pdp__add-btn"
            onClick={() =>
              onAddToCart &&
              onAddToCart({ productId: product.id, size: selectedSize, quantity })
            }
          >
            <CartIcon />
            Add to Cart
          </button>

          <div className="rl-pdp__accordion">
            {product.sections.map((sec) => {
              const isOpen = openSection === sec.id;
              return (
                <div className="rl-pdp__accordion-item" key={sec.id}>
                  <button
                    type="button"
                    className="rl-pdp__accordion-header"
                    onClick={() => setOpenSection(isOpen ? null : sec.id)}
                    aria-expanded={isOpen}
                  >
                    {sec.title}
                    <span className="rl-pdp__accordion-icon">
                      {isOpen ? <MinusIcon /> : <PlusIcon />}
                    </span>
                  </button>
                  {isOpen && (
                    <p className="rl-pdp__accordion-content">{sec.content}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Cross-sell */}
      <div className="rl-pdp__lineup">
        <h2 className="rl-pdp__lineup-heading">{lineupHeading}</h2>
        <p className="rl-pdp__lineup-subheading">{lineupSubheading}</p>

        <div className="rl-pdp__lineup-list">
          {lineup.map((item) => (
            <div className="rl-pdp__lineup-item" key={item.id}>
              <div
                className="rl-pdp__lineup-thumb"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <div className="rl-pdp__lineup-text">
                <span className="rl-pdp__lineup-title">{item.title}</span>
                <span className="rl-pdp__lineup-price">
                  {item.price}
                  {item.originalPrice && (
                    <span className="rl-pdp__lineup-price-original">
                      {item.originalPrice}
                    </span>
                  )}
                </span>
              </div>
              <button
                type="button"
                className="rl-pdp__lineup-cart-btn"
                onClick={() => handleViewProduct(item.id)}
              >
                <LucideEye />
                View
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}