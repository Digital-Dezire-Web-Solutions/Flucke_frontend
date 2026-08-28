import React, { useEffect, useRef, useState } from "react";
import "./ProductDetail.css";
import product1 from "../../Assets/Products/product4.jpg";
import product2 from "../../Assets/Products/product5.jpg";
import product3 from "../../Assets/Products/product3.jpg";
import product4 from "../../Assets/Products/prodbeforeafter.avif";
import { LucideEye } from "lucide-react";
import { FiShoppingCart } from "react-icons/fi";
import { FaAmazon } from "react-icons/fa";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


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

export default function ProductDetail({
  lineupHeading = "Complete Lineup",
  lineupSubheading = "Check out other essentials in the Pear Rosaline Collection and build your full daily skincare ritual with ease.",
  onAddToCart,
}) {
  const navigate = useNavigate();
  const { product, products } = useSelector((state) => state.products);
  const activeProduct =
    product ||
    products.find((p) => p.isFeatured) ||
    products[0];

  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [openSection, setOpenSection] = useState(null);
  const topRef = useRef(null);
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    setActiveImage(0);
    setQuantity(1);

    if (activeProduct?.sizes?.length) {
      setSelectedSize(activeProduct.sizes[0]);
    }

    setOpenSection("description");
  }, [activeProduct]);

  const totalImages = activeProduct?.images?.length || 1;

  const goPrev = () =>
    setActiveImage((i) => (i - 1 + totalImages) % totalImages);

  const goNext = () =>
    setActiveImage((i) => (i + 1) % totalImages);


  const handleViewProduct = (id) => {
    navigate(`/productdetail/${id}`);
  };

  const sections = [
    {
      id: "description",
      title: "Description",
      content: activeProduct?.description,
    },
    {
      id: "benefits",
      title: "Benefits",
      content: activeProduct?.benefits?.join(", "),
    },
    {
      id: "howToUse",
      title: "How To Use",
      content: activeProduct?.howToUse,
    },
    {
      id: "ingredients",
      title: "Ingredients",
      content: activeProduct?.ingredients,
    },
  ];

  const lineup = products.filter(
    (item) =>
      item._id !== activeProduct._id &&
      item.category?._id === activeProduct.category?._id
  );

  if (!activeProduct) {
    return <h2>Loading...</h2>;
  }

  return (
    <section className="rl-pdp" ref={topRef}>
      <div className="rl-pdp__top">
        {/* Gallery */}
        <div className="rl-pdp__gallery">
          <div className="rl-pdp__thumbs">
            {activeProduct?.images?.map((img, i) => (
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
              style={{ backgroundImage: `url(${activeProduct?.images?.[activeImage]})` }}
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
          <h1 className="rl-pdp__title">{activeProduct.name}</h1>
          <p className="rl-pdp__subtitle">{activeProduct.description}</p>

          <div className="rl-pdp__rating">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon key={i} filled={i < Math.round(activeProduct.rating)} />
            ))}
            <span className="rl-pdp__rating-text">
              {activeProduct.rating}/5 ({activeProduct.totalReviews.toLocaleString()}{" "}
              reviews)
            </span>
          </div>

          <div className="rl-pdp__price-row">
            <span className="rl-pdp__price">₹{activeProduct.salePrice || activeProduct.price}</span>
            {activeProduct.salePrice > 0 && (
              <span className="rl-pdp__price-original">
                ₹{activeProduct.price}
              </span>
            )}
          </div>

          <div className="rl-pdp__size">
            <span className="rl-pdp__label">Net Weight:</span>
            <div className="rl-pdp__size-options">
              {activeProduct?.sizes.map((s) => (
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
                <FaMinus />
              </button>
              <span className="rl-pdp__stepper-value">{quantity}</span>
              <button
                type="button"
                className="rl-pdp__stepper-btn"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
              >
                <FaPlus />
              </button>
            </div>
          </div>

          <div className="product-detail-buttons">
            <button
              type="button"
              className="rl-pdp__add-btn"
              onClick={() =>
                onAddToCart &&
                onAddToCart({
                  productId: product._id,
                  size: selectedSize,
                  quantity,
                })
              }
            >
              <FiShoppingCart />
              Add to Cart
            </button>
            <button
              type="button"
              className="rl-pdp__add-btn"
              onClick={() =>
                onAddToCart &&
                onAddToCart({
                  productId: product._id,
                  size: selectedSize,
                  quantity,
                })
              }
            >
              <FaAmazon />
              Buy on Amazon
            </button>
          </div>

          <div className="rl-pdp__accordion">
            {sections.map((sec) => {
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
                      {isOpen ? <FaMinus /> : <FaPlus />}
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
        <div className="rl-pdp__lineup-list">
          <div >
            <h2 className="rl-pdp__lineup-heading">{lineupHeading}</h2>
            <p className="rl-pdp__lineup-subheading">{lineupSubheading}</p>
          </div>
          {lineup.map((item) => (
            <div className="rl-pdp__lineup-item" key={item._id}>
              <div
                className="rl-pdp__lineup-thumb"
                style={{ backgroundImage: `url(${item.images?.[0]})` }}
              />
              <div className="rl-pdp__lineup-text">
                <span className="rl-pdp__lineup-title">{item.name}</span>
                <span className="rl-pdp__lineup-price">
                  ₹{item.salePrice || item.price}

                  {item.salePrice > 0 && (
                    <span className="rl-pdp__lineup-price-original">
                      ₹{item.price}
                    </span>
                  )}
                </span>
              </div>
              <button
                type="button"
                className="rl-pdp__lineup-cart-btn"
                onClick={() => handleViewProduct(item._id)}
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
