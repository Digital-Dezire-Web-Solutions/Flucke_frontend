import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./AdminTable.css";
import "./ImageManager.css";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../../Redux/features/products/productSlice";

const initialProduct = {
  name: "",
  shortDescription: "",
  description: "",
  price: "",
  salePrice: "",
  stock: "",
  sizes: "", // comma-separated in the form, e.g. "50ml, 100ml, 200ml"
  benefits: "", // comma-separated, e.g. "Hydrating, Brightening"
  howToUse: "",
  ingredients: "",
  amazonLink: "",
  isFeatured: false,
  status: true, // true = active / visible on the storefront
};

export default function Products() {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState(initialProduct);

  // --- Image management state -------------------------------------------
  const [imageList, setImageList] = useState([]);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [dragId, setDragId] = useState(null);

  const uidRef = useRef(0);
  const nextId = () => `img-${uidRef.current++}`;

  const previewUrlCache = useRef(new Map());

  const getPreviewUrl = (img) => {
    if (typeof img.source === "string") return img.source;
    if (!previewUrlCache.current.has(img.id)) {
      previewUrlCache.current.set(img.id, URL.createObjectURL(img.source));
    }
    return previewUrlCache.current.get(img.id);
  };

  const revokeIfBlob = (id) => {
    const url = previewUrlCache.current.get(id);
    if (url) {
      URL.revokeObjectURL(url);
      previewUrlCache.current.delete(id);
    }
  };

  const revokeAll = () => {
    previewUrlCache.current.forEach((url) => URL.revokeObjectURL(url));
    previewUrlCache.current.clear();
  };

  useEffect(() => () => revokeAll(), []);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  // --- Image handlers ------------------------------------------------------
  const handleAddImages = (e) => {
    const files = Array.from(e.target.files);
    const newItems = files.map((file) => ({ id: nextId(), source: file }));
    setImageList((prev) => [...prev, ...newItems]);
    e.target.value = "";
  };

  const removeImage = (id) => {
    revokeIfBlob(id);
    setImageList((prev) => prev.filter((i) => i.id !== id));
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const removeSelected = () => {
    if (!window.confirm(`Remove ${selectedIds.size} selected image(s)?`)) return;
    selectedIds.forEach((id) => revokeIfBlob(id));
    setImageList((prev) => prev.filter((i) => !selectedIds.has(i.id)));
    setSelectedIds(new Set());
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    setSelectedIds((prev) =>
      prev.size === imageList.length ? new Set() : new Set(imageList.map((i) => i.id)),
    );
  };

  const handleDrop = (targetId) => {
    if (dragId === null || dragId === targetId) return;
    setImageList((prev) => {
      const fromIndex = prev.findIndex((i) => i.id === dragId);
      const toIndex = prev.findIndex((i) => i.id === targetId);
      if (fromIndex === -1 || toIndex === -1) return prev;
      const next = [...prev];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      return next;
    });
    setDragId(null);
  };

  // --- Save / delete product -----------------------------------------------
  const toArray = (commaString) =>
    commaString
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

  const handleSave = async () => {
    const formData = new FormData();

    formData.append("name", product.name);
    formData.append("shortDescription", product.shortDescription);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("salePrice", product.salePrice);
    formData.append("stock", product.stock);
    formData.append("sizes", JSON.stringify(toArray(product.sizes)));
    formData.append("benefits", JSON.stringify(toArray(product.benefits)));
    formData.append("howToUse", product.howToUse);
    formData.append("ingredients", product.ingredients);
    formData.append("amazonLink", product.amazonLink);
    formData.append("isFeatured", product.isFeatured);
    formData.append("status", product.status);

    imageList
      .filter((img) => img.source instanceof File)
      .forEach((img) => formData.append("images", img.source));

    const imageOrder = imageList.map((img) =>
      img.source instanceof File
        ? { type: "new" }
        : { type: "existing", value: img.source },
    );
    formData.append("imageOrder", JSON.stringify(imageOrder));

    if (product._id) {
      await dispatch(updateProduct({ id: product._id, data: formData }));
    } else {
      await dispatch(createProduct(formData));
    }

    dispatch(getProducts());

    revokeAll();
    setOpen(false);
    setProduct(initialProduct);
    setImageList([]);
    setSelectedIds(new Set());
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete Product?")) return;
    dispatch(deleteProduct(id));
  };

  const closeModal = () => {
    revokeAll();
    setOpen(false);
    setProduct(initialProduct);
    setImageList([]);
    setSelectedIds(new Set());
  };

  const openEdit = (item) => {
    setProduct({
      ...initialProduct,
      ...item,
      sizes: (item.sizes || []).join(", "),
      benefits: (item.benefits || []).join(", "),
      howToUse: item.howToUse || "",
      isFeatured: Boolean(item.isFeatured),
      status: item.status !== false,
    });
    setImageList(
      (item.images || []).map((src) => ({ id: nextId(), source: src })),
    );
    setSelectedIds(new Set());
    setOpen(true);
  };

  return (
    <div className="admin-table-wrapper">
      <div className="table-header">
        <h2>Products</h2>

        <div style={{ display: "flex", gap: 10 }}>
          <input
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            className="save-btn"
            onClick={() => {
              setProduct(initialProduct);
              setImageList([]);
              setSelectedIds(new Set());
              setOpen(true);
            }}
          >
            + Add Product
          </button>
        </div>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Sale</th>
            <th>Stock</th>
            <th>Rating</th>
            <th>Featured</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((item) => (
            <tr key={item._id}>
              <td>
                <img
                  src={item.images?.[0]}
                  alt={item.name}
                  style={{
                    width: 60,
                    height: 60,
                    objectFit: "cover",
                    borderRadius: 8,
                  }}
                />
              </td>
              <td>{item.name}</td>
              <td>₹{item.price}</td>
              <td>₹{item.salePrice}</td>
              <td>{item.stock}</td>
              <td>
                {item.rating ? `${item.rating} ★` : "—"}{" "}
                {item.totalReviews ? `(${item.totalReviews})` : ""}
              </td>
              <td>
                <span className={`status-pill ${item.isFeatured ? "status-pill--on" : "status-pill--off"}`}>
                  {item.isFeatured ? "Yes" : "No"}
                </span>
              </td>
              <td>
                <span className={`status-pill ${item.status !== false ? "status-pill--on" : "status-pill--off"}`}>
                  {item.status !== false ? "Active" : "Inactive"}
                </span>
              </td>
              <td>
                <button className="edit-btn" onClick={() => openEdit(item)}>
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {open && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <h3>{product._id ? "Edit Product" : "Add Product"}</h3>

            <input
              placeholder="Product Name"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
            />

            <textarea
              placeholder="Short Description"
              value={product.shortDescription}
              onChange={(e) =>
                setProduct({ ...product, shortDescription: e.target.value })
              }
              style={{
                width: "100%",
                minHeight: 50,
                marginBottom: 15,
                padding: 12,
                borderRadius: 8,
                border: "1px solid #ddd",
              }}
            />
            <textarea
              placeholder="Description"
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
              style={{
                width: "100%",
                minHeight: 100,
                marginBottom: 15,
                padding: 12,
                borderRadius: 8,
                border: "1px solid #ddd",
              }}
            />

            <input
              type="number"
              placeholder="Price"
              value={product.price}
              onChange={(e) => setProduct({ ...product, price: e.target.value })}
            />

            <input
              type="number"
              placeholder="Sale Price"
              value={product.salePrice}
              onChange={(e) =>
                setProduct({ ...product, salePrice: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Sizes (comma separated, e.g. 50ml, 100ml, 200ml)"
              value={product.sizes}
              onChange={(e) => setProduct({ ...product, sizes: e.target.value })}
            />

            <input
              type="text"
              placeholder="Benefits (comma separated, e.g. Hydrating, Brightening)"
              value={product.benefits}
              onChange={(e) =>
                setProduct({ ...product, benefits: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="How to use"
              value={product.howToUse}
              onChange={(e) =>
                setProduct({ ...product, howToUse: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Ingredients"
              value={product.ingredients}
              onChange={(e) =>
                setProduct({ ...product, ingredients: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Stock"
              value={product.stock}
              onChange={(e) => setProduct({ ...product, stock: e.target.value })}
            />
            <input
              type="text"
              placeholder="Amazon Link"
              value={product.amazonLink}
              onChange={(e) =>
                setProduct({ ...product, amazonLink: e.target.value })
              }
            />

            <div className="toggle-row">
              <label className="toggle-row__item">
                <input
                  type="checkbox"
                  checked={product.isFeatured}
                  onChange={(e) =>
                    setProduct({ ...product, isFeatured: e.target.checked })
                  }
                />
                Featured product
              </label>

              <label className="toggle-row__item">
                <input
                  type="checkbox"
                  checked={product.status}
                  onChange={(e) =>
                    setProduct({ ...product, status: e.target.checked })
                  }
                />
                Active (visible on storefront)
              </label>
            </div>

            <label className="image-upload">Product Images</label>

            <input type="file" multiple accept="image/*" onChange={handleAddImages} />

            {imageList.length > 0 && (
              <div className="image-manager">
                <div className="image-manager__toolbar">
                  <label className="image-manager__select-all">
                    <input
                      type="checkbox"
                      checked={selectedIds.size === imageList.length}
                      onChange={toggleSelectAll}
                    />
                    Select all
                  </label>

                  {selectedIds.size > 0 && (
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={removeSelected}
                    >
                      Delete Selected ({selectedIds.size})
                    </button>
                  )}
                </div>

                <div className="image-preview">
                  {imageList.map((img, index) => (
                    <div
                      key={img.id}
                      className={`image-thumb ${dragId === img.id ? "image-thumb--dragging" : ""
                        }`}
                      draggable
                      onDragStart={() => setDragId(img.id)}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDrop(img.id)}
                      onDragEnd={() => setDragId(null)}
                      title="Drag to reorder"
                    >
                      <span className="image-thumb__order">{index + 1}</span>

                      <input
                        type="checkbox"
                        className="image-thumb__select"
                        checked={selectedIds.has(img.id)}
                        onChange={() => toggleSelect(img.id)}
                        onClick={(e) => e.stopPropagation()}
                      />

                      <button
                        type="button"
                        className="image-thumb__remove"
                        aria-label="Remove image"
                        onClick={() => removeImage(img.id)}
                      >
                        &times;
                      </button>

                      <img src={getPreviewUrl(img)} alt="" draggable={false} />
                    </div>
                  ))}
                </div>

                <p className="image-manager__hint">
                  Drag a photo to reorder. The first photo is used as the main
                  product image.
                </p>
              </div>
            )}

            <div className="modal-actions">
              <button onClick={closeModal}>Cancel</button>
              <button className="save-btn" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}