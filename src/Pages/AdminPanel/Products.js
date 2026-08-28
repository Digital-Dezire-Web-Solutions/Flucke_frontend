import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./AdminTable.css";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../../Redux/features/products/productSlice";

const initialProduct = {
  name: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  stock: "",
  images: [],
};

export default function Products() {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState(initialProduct);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSave = async () => {
    const formData = new FormData();

    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("category", product.category);
    formData.append("brand", product.brand);
    formData.append("price", product.price);
    formData.append("salePrice", product.salePrice);
    formData.append("stock", product.stock);

    product.images.forEach((image) => {
      // upload only newly selected files
      if (image instanceof File) {
        formData.append("images", image);
      }
    });

    if (product._id) {
      await dispatch(
        updateProduct({
          id: product._id,
          data: formData,
        }),
      );
    } else {
      await dispatch(createProduct(formData));
    }

    dispatch(getProducts());

    setOpen(false);
    setProduct(initialProduct);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete Product?")) return;

    dispatch(deleteProduct(id));
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

            <th>Category</th>

            <th>Brand</th>

            <th>Price</th>

            <th>Sale</th>

            <th>Stock</th>

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

              <td>{item.category}</td>

              <td>{item.brand}</td>

              <td>₹{item.price}</td>

              <td>₹{item.salePrice}</td>

              <td>{item.stock}</td>

              <td>
                <button
                  className="edit-btn"
                  onClick={() => {
                    setProduct({
                      ...item,
                      images: item.images || [],
                    });

                    setOpen(true);
                  }}
                >
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
              onChange={(e) =>
                setProduct({
                  ...product,
                  name: e.target.value,
                })
              }
            />

            <textarea
              placeholder="Description"
              value={product.description}
              onChange={(e) =>
                setProduct({
                  ...product,
                  description: e.target.value,
                })
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
              placeholder="Category"
              value={product.category}
              onChange={(e) =>
                setProduct({
                  ...product,
                  category: e.target.value,
                })
              }
            />

            <input
              placeholder="Brand"
              value={product.brand}
              onChange={(e) =>
                setProduct({
                  ...product,
                  brand: e.target.value,
                })
              }
            />

            <input
              type="number"
              placeholder="Price"
              value={product.price}
              onChange={(e) =>
                setProduct({
                  ...product,
                  price: e.target.value,
                })
              }
            />

            <input
              type="number"
              placeholder="Sale Price"
              value={product.salePrice}
              onChange={(e) =>
                setProduct({
                  ...product,
                  salePrice: e.target.value,
                })
              }
            />

            <input
              type="number"
              placeholder="Stock"
              value={product.stock}
              onChange={(e) =>
                setProduct({
                  ...product,
                  stock: e.target.value,
                })
              }
            />

            <label className="image-upload">Product Images</label>

            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) =>
                setProduct({
                  ...product,
                  images: [...e.target.files],
                })
              }
            />
            <div className="image-preview">
              {product.images?.length > 0 &&
                product.images.map((img, index) => {
                  const src =
                    typeof img === "string" ? img : URL.createObjectURL(img);

                  return <img key={index} src={src} alt="" />;
                })}
            </div>
            <div className="modal-actions">
              <button
                onClick={() => {
                  setOpen(false);
                  setProduct(initialProduct);
                }}
              >
                Cancel
              </button>

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
